import Thumbs from 'components/thumbs/Thumbs';
import FileField from 'CustomFields/FileField/FileInput';
import InputField from 'CustomFields/InputField/InputField';
import TextareaField from 'CustomFields/TextEditer/TextareaEditor';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { BsPaperclip } from "react-icons/bs";
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import {validationPost,validationEditPost} from 'const/validateSchema';




const PostModal = props => {

 
  const { isEdit, isAdd, toggleEdit, toggleAdd, post, onAdd, onEdit } = props;


  const openModal = () => {
    if (isAdd) {
      return isAdd;
    }
    if (isEdit) {
      return isEdit;
    }
  }

  const toggleModal = () => {
    if (isEdit) {
      return toggleEdit;
    }
    if (isAdd) {
      return toggleAdd;
    }
  }

  const addInitialValues = {
    title: '',
    image: '',
    contents: '',
  }

  const editInitialValues = {
    id: post.id,
    title: post.title,
    image: post.image,
    contents: post.contents,
  }



  return (

    <div>
      <Modal isOpen={openModal()} toggle={toggleModal()} size="lg">
        <ModalHeader toggle={toggleModal()}>Modal title</ModalHeader>
        <ModalBody>
          <React.Fragment>

            <Formik
              initialValues={isAdd ? addInitialValues : editInitialValues}
              validationSchema={isAdd ? validationPost : validationEditPost}
              validateOnBlur={true}
              validateOnChange={true}

              onSubmit={values => {
                 isAdd ? onAdd(values) : onEdit(values);
              // console.log(values)
              }}
            >
              {formikProps => {
                const { values, errors, touched, setFieldValue } = formikProps;
                // console.log(values);
                return (
                  <Form>
                    <Row>
                      <Col xs="12" md="12">
                        <Field
                          name="title"
                          label="Title"
                          //validate={isEdit ? false : checkName}
                          component={InputField}
                        />
                      </Col>

                      <Col xs="12" md="12">
                        <Field
                          name="image"
                          label="Image"
                          component={FileField}
                        />
                      </Col>

                      <Thumbs file={values.image} />

                      <Col xs="12" md="12">
                        <Field
                          name="contents"
                          label="Contents"
                          component={TextareaField}
                        />
                      </Col>
                    </Row>


                    <Button color="danger" type="submit" size="lg" block>
                      Submit <BsPaperclip />
                    </Button>
                  </Form>
                )
              }}

            </Formik>
          </React.Fragment>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal()}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>

  )
}

PostModal.defaultProps = {
  isEdit: false,
  isAdd: false,
  toggleEdit: () => { },
  toggleAdd: () => { },
  post: {},
  onAdd: () => { },
  onEdit: () => { },
}

export default PostModal
