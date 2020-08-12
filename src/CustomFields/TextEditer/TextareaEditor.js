import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FormGroup, Label } from 'reactstrap';

const TextareaEditor = props => {

  const editor = useRef(null);

  const { field, form, type, label, placeholder, disabled } = props;

  const { name, value, onChange } = field;
  const { errors } = form;


  

  return (
    <FormGroup>
      <Label for="exampleEmail">{label}</Label>
      <ReactQuill
        theme="snow"
        name={name}
        value={value || ''}
        onChange={onChange(name)}
      />
      <span className="text-danger">{errors[name]}</span>
    </FormGroup>
  )
}

TextareaEditor.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

TextareaEditor.defaultProps = {
  type: 'textarea',
  label: '',
  placeholder: '',
  disabled: false,
}
export default TextareaEditor
