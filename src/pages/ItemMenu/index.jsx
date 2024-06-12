import { Button, Container, Grid, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import firebase from "services/firebase/firebase";
import DataTable from "components/UI/DataTable";
import FormModal from "./components/FormModal";
import capitalizeFirstLetter from "helper/capitalizeFirstLetter";
import ConfirmationModal from "components/UI/ConfirmationModal";
import SuccessModal from "components/UI/SuccessModal";
import ErrorModal from "components/UI/ErrorModal";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialValuesFormState = {
  name: "",
  category: "",
  price: "",
  options: "",
  amountInStock: "",
}

const ItemMenu = () => {
  const [initialValuesForm, setInitialValuesForm] = useState(initialValuesFormState);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isShowModalForm, setIsShowModalForm] = useState(false);
  const [isShowDeleteModalConfirmation, setIsShowDeleteModalConfirmation] = useState(false);
  const [isShowSuccessModal, setIsShowSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formType, setFormType] = useState("");
  const [products, setProducts] = useState([]);

  const getMenuItemList = async () => {
    setIsLoading(true);
    await firebase.getProducts((data) => {
      setIsLoading(false);
      setProducts(data.map(({ name, category, price, amountInStock, options, id }) => {
        return { name, category, price, amountInStock, options, id }
      }));
    });
  }

  useEffect(() => {
    getMenuItemList();
  }, [])

  const columns = [
    { 
      id: 'name', 
      label: 'Name', 
      minWidth: 170 
    },
    {
      id: 'category',
      label: 'Category',
      minWidth: 170,
    },
    {
      id: 'price',
      label: 'Price',
      minWidth: 170,
    },
    {
      id: 'amountInStock',
      label: 'Amount In Stock',
      minWidth: 170,
    },
    {
      id: 'options',
      label: 'Options',
      minWidth: 170,
    },
    {
      id: 'actions',
      label: 'Actions',
      minWidth: 170,
    },
  ];

  const onHandleShowFormModal = (type, selectedProduct) => {
    setIsShowModalForm(true);
    setFormType(type);
    if (type === "edit") {
      setInitialValuesForm((prevState) => {
        return {
          ...prevState,
          ...selectedProduct
        }
      })
    }
  }

  const onHandleCloseFormModal = () => {
    setIsShowModalForm(false);
    setInitialValuesForm(initialValuesFormState);
  }

  const onHandleShowDeleteModalConfirmation = (selectedProduct) => {
    setSelectedProduct(selectedProduct);
    setIsShowDeleteModalConfirmation(true);
  }

  const onHandleCloseDeleteModalConfirmation = () => {
    setSelectedProduct(null);
    setIsShowDeleteModalConfirmation(false);
  }

  const onHandleSubmitDeleteProduct = async () => {
    setIsLoading(true);
    setIsShowDeleteModalConfirmation(false);
    await firebase.deleteProduct(selectedProduct.id).then(() => {
      setIsShowSuccessModal(true);
    }).catch((err) => {
      setErrorModal(err.message)
    });
    setIsLoading(false);
  }

  return (
    <Container style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
      {
        isShowSuccessModal && 
        <SuccessModal
          isShow={isShowSuccessModal}
          title="Success"
          description="Successfully Deleted Product!"
          onOk={() => {
            setIsShowSuccessModal(false)
          }}
        />
      }
      {
        errorModal && 
        <ErrorModal
          isShow={errorModal}
          title="Error"
          description={errorModal}
          onOk={() => {
            onHandleCloseDeleteModalConfirmation();
            setErrorModal("");
          }}
        />
      }
      {
        isShowDeleteModalConfirmation &&
        <ConfirmationModal
          title="Confirmation"
          description="Are you sure you want to delete this product?"
          isShow={isShowDeleteModalConfirmation}
          onOk={onHandleSubmitDeleteProduct}
          onCancel={onHandleCloseDeleteModalConfirmation}
        />
      }
      {
        isShowModalForm &&
        <FormModal
          isShow={isShowModalForm}
          formType={formType}
          initialValuesFormState={initialValuesForm}
          onCancel={onHandleCloseFormModal}
          setInitialValuesForm={setInitialValuesForm}
        />
      }
      <Grid container spacing={2}>
        <Grid item xs={12} display="flex" justifyContent="space-between">
          <h1>Restaurant Sales Exercise</h1>
          <Button variant="contained" onClick={() => onHandleShowFormModal("add")}>Create Product</Button>
        </Grid>
        <Grid item xs={12} style={{ position: "relative" }}>
          <DataTable
            renderTableRowData={
              (row) => {
                return (
                  <TableRow key={row.name}>
                    <TableCell>
                      {row.name}
                    </TableCell>
                    <TableCell>
                      {capitalizeFirstLetter(row.category)}
                    </TableCell>
                    <TableCell>
                      ₱ {row.price}
                    </TableCell>
                    <TableCell>
                      {row.amountInStock}
                    </TableCell>
                    <TableCell>
                      {capitalizeFirstLetter(row.options)}
                    </TableCell>
                    <TableCell padding="checkbox">
                      <Button
                        onClick={() => onHandleShowFormModal("edit", row)}
                        color="primary"
                      >
                        <EditIcon/>
                      </Button>
                      <Button color="error"  onClick={() => onHandleShowDeleteModalConfirmation(row)}>
                        <DeleteIcon/>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              }
            }
            columns={columns}
            data={products}
            isTableLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default ItemMenu