import React from 'react'
import PropTypes from 'prop-types';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import Select from 'react-select';


const CustomSelect = props => {

  const { field, form, type, label, placeholder, disabled, options } = props;

  const { name, value } = field;
  const { errors } = form;

  const selectedOption = options.find(option => option.value === value);

 
  

  const handleSelectedOptionChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : selectedOption;

    console.log({ selectedValue });

    const changeEvent = {
      target: {
        name: name,
        value: selectedValue
      }
    };

    field.onChange(changeEvent);

  }

  return (
    <FormGroup>
      <Label for="exampleEmail">{label}</Label>
      <Select
        {...field}

        value={selectedOption}
        onChange={handleSelectedOptionChange}
        placeholder={placeholder}
        isDisabled={disabled}
        options={options}
      />
      <small className="text-danger">{errors[name]}</small>
    </FormGroup>
  )
}

CustomSelect.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.array
};

CustomSelect.defaultProps = {
  type: 'select',
  label: '',
  placeholder: '',
  disabled: false,
  options: [],
}

export default CustomSelect
