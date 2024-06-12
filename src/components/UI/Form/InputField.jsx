import { TextField } from "@mui/material"
import { Fragment } from "react"
import PropTypes from 'prop-types';

const InputField = ({ 
  value, 
  name, 
  label, 
  type, 
  onChange, 
  ...props 
}) => {
  return (
    <Fragment>
      <TextField
        fullWidth
        id={name}
        name={name}
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
    </Fragment>
  )
}

InputField.propTypes = {
  value: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputField