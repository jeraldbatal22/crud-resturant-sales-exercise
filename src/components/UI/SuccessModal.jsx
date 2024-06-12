import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

const SuccessModal = ({ isShow, onCancel, onOk, title, description }) => {
  return (
    <React.Fragment>
      <Dialog
        open={isShow}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title || "Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onOk} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

SuccessModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string.isRequired,
};

export default SuccessModal 