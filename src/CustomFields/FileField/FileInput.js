import React from 'react'
import PropTypes from 'prop-types';
import { FormFeedback, FormGroup, Input, Label, FormText } from 'reactstrap';


const FileInput = props => {

  const { field, form, label, disabled } = props;

  const { name, value, onBlur } = field;
  const { errors, setFieldValue } = form;


  return (
    <FormGroup>
      <Label for="exampleFile">{label && label}</Label>
      <Input
        type="file"
        name={name}
        onChange={event => {
          setFieldValue(name, event.currentTarget.files[0]);
        }}
        onBlur={onBlur}
        disabled={disabled}
      />
      <FormText color="muted">
        {errors['image'] ? <span className="text-danger">{errors['image']}</span> : "Remember after submit the file input might not display resest value"}
      </FormText>
    </FormGroup>

  )
}

FileInput.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,

};

FileInput.defaultProps = {
  type: 'file',
  label: '',
  placeholder: '',
  disabled: false,
  setFieldValue: () => { },

}


export default FileInput
