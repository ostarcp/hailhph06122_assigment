import PropTypes from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

const InputField = props => {

  const { field, form, label, type, placeholder, disabled } = props;

  const { name, value } = field;
  const { errors } = form;

  // console.log('field',field);
  // console.log('form',form);



  return (
    <FormGroup>
      <Label for="exampleEmail">{label}</Label>
      <Input
        {...field}
        value={value}
        type={type}
        placeholder={placeholder} 
        invalid={errors[name] ? true : false}
        />
        <FormFeedback>{errors[name]}</FormFeedback>
    </FormGroup>
  )
}

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,

}

InputField.defaultProps = {
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
}

export default InputField
