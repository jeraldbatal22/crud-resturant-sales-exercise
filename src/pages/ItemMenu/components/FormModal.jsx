import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControl } from '@mui/material';
import PropTypes from 'prop-types';
import firebase from 'services/firebase/firebase';
import Spinner from 'components/UI/Spinner';
import InputField from 'components/UI/Form/InputField';
import SelectField from 'components/UI/Form/SelectField';
import { useState } from 'react';
import SuccessModal from 'components/UI/SuccessModal';
import ErrorModal from 'components/UI/ErrorModal';

const FormModal = ({ formType, initialValuesFormState, setInitialValuesForm, isShow, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowSuccessModal, setIsShowSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState("");

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setInitialValuesForm(prevState => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  };

  const onHandleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataPayload = Object.fromEntries(formData.entries());
    setIsLoading(true);

    if (formType === "add") {
      await firebase.createProduct(formDataPayload).then(() => {
        setIsShowSuccessModal(true);
      }).catch((err) => {
        setErrorModal(err.message)
      });
    }

    if (formType === "edit" && initialValuesFormState.id) {
      await firebase.updateProduct(initialValuesFormState.id, formDataPayload).then(() => {
        setIsShowSuccessModal(true);
      }).catch((err) => {
        setErrorModal(err.message)
      });
    }

    setIsLoading(false);

  }

  return (
    <React.Fragment>
      {
        errorModal && 
        <ErrorModal
          isShow={errorModal}
          title="Error"
          description={errorModal}
          onOk={() => {
            setErrorModal("");
          }}
        />
      }
      {
        isShowSuccessModal && 
        <SuccessModal
          isShow={isShowSuccessModal}
          title="Success"
          description={`Successfully ${formType === "add" ? "Created" : "Updated"} product!`}
          onOk={() => {
            onCancel();
            setIsShowSuccessModal(false)
          }}
        />
      }
      <Spinner isLoading={isLoading} title={`${formType === "add" ? "Creating" : "Updating"} product!`}/>
      <Dialog
        maxWidth="lg"
        open={isShow}
        fullWidth={true}
        onClose={onCancel}
        PaperProps={{
          component: 'form',
          onSubmit: onHandleSubmit,
        }}
      >
        <DialogTitle>{formType === "add" ? "Create" : "Update"} Product</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            autoComplete="off"
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            <FormControl fullWidth>
              <InputField
                required
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                value={initialValuesFormState.name}
                onChange={onHandleChange}
              />
            </FormControl>
            <FormControl>
              <SelectField
                labelId="select-label-category"
                id="category"
                name="category"
                value={initialValuesFormState.category}
                label="Category"
                onChange={onHandleChange}
                options={[
                  { label: "Drinks", value: "Drinks"},
                  { label: "Dessert", value: "Dessert"},
                  { label: "Coffee", value: "Coffee"},
                ]}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputField
                autoFocus
                required
                id="price"
                name="price"
                label="Price"
                onChange={onHandleChange}
                value={initialValuesFormState.price}
                type="number"
              />
            </FormControl>
            <FormControl fullWidth>
              <SelectField
                labelId="select-label-options"
                id="options"
                name="options"
                value={initialValuesFormState.options}
                label="Options"
                onChange={onHandleChange}
                options={[
                  { label: "Small", value: "Small"},
                  { label: "Medium", value: "Medium"},
                  { label: "Large", value: "Large"},
                ]}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputField
                autoFocus
                required
                id="amountInStock"
                name="amountInStock"
                label="Amount In Stock"
                type="number"
                value={initialValuesFormState.amountInStock}
                onChange={onHandleChange}
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="contained">
            {formType === "add" ? "Create" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

FormModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  formType: PropTypes.string,
  initialValuesFormState: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  setInitialValuesForm: PropTypes.func.isRequired,
};

export default FormModal