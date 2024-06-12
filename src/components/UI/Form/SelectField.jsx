import { InputLabel, MenuItem, Select } from "@mui/material"
import { Fragment } from "react"
import PropTypes from 'prop-types';

const SelectField = ({ 
  value, 
  name, 
  label, 
  onChange, 
  labelId,
  options,
  ...props 
}) => {
  return (
    <Fragment>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <Select
        labelId={labelId}
        id={name}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        {...props}
      >
        {
          options.map(option => <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>)
        }
      </Select>
    </Fragment>
  )
}

SelectField.propTypes = {
  value: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelId: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectField