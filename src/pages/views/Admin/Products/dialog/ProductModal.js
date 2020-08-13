import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';


import { BsGem, BsPaperclip } from "react-icons/bs";
import { validationProduct } from 'const/validateSchema';
import { Field, Form, Formik } from 'formik';
import FileField from 'CustomFields/FileField/FileInput';
import InputField from 'CustomFields/InputField/InputField';
import SelectField from 'CustomFields/SelectField/CustomSelect';
import TextareaField from 'CustomFields/TextEditer/TextareaEditor';

import Thumbs from 'components/thumbs/Thumbs';
import getProduct from 'redux/selector/getProduct';

const ProductModal = props => {

  const categoryReducer = useSelector(state => state.categoryReducer);

  const { cateList } = categoryReducer;
  const { isEdit, isAdd, toggleEdit, toggleAdd, food, onAdd, onEdit } = props;
  const productList = getProduct();

  let tmp = []
  cateList.forEach(x => {
    tmp.push({ value: x.id, label: x.name });
  });


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

  const checkName = (value) => {
    let error;
    if (!productList.every(el => el.name.toLowerCase().trim() !== value.toLowerCase().trim())) {
      error = "The product name exits"
    }
    return error
  }

  const addInitialValues = {
    name: '',
    image: '',
    quanity: '',
    cateId: '',
    contents: '',
    price: '',
    salePrice: '',
    shortDes: '',
    status: '',
  }

  const editInitialValues = {
    id: food.id,
    name: food.name,
    image: food.image,
    quanity: food.quanity,
    cateId: food.cateId,
    contents: food.contents,
    price: food.price,
    salePrice: food.salePrice,
    shortDes: food.shortDes,
    status: food.status
  }



  return (

    <div>
      <Modal isOpen={openModal()} toggle={toggleModal()} size="lg">
        <ModalHeader toggle={toggleModal()}>Modal title</ModalHeader>
        <ModalBody>
          <React.Fragment>

            <Formik
              initialValues={isAdd ? addInitialValues : editInitialValues}
              validationSchema={validationProduct}
              validateOnBlur={true}
              validateOnChange={true}

              onSubmit={values => {
                isAdd ? onAdd(values) : onEdit(values);
              }}
            >
              {formikProps => {
                const { values } = formikProps;
                // console.log(values);
                return (
                  <Form>
                    <Row>
                      <Col xs="12" md="12">
                        <Field
                          name="name"
                          label="Dishes"
                          validate={isEdit ? false : checkName}
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
                          name="cateId"
                          label="Category"
                          component={SelectField}
                          options={tmp}
                        />
                      </Col>

                      <Col xs="12" md="12">
                        <Field
                          name="quanity"
                          label="Quanity"
                          type="number"
                          component={InputField}
                        />
                      </Col>

                      <Col xs="12" md="12">
                        <Field
                          name="price"
                          label="Price"
                          component={InputField}
                        />
                      </Col>

                      <Col xs="12" md="12">
                        <Field
                          name="salePrice"
                          label="Sale Price"
                          component={InputField}
                        />
                      </Col>

                      <Col xs="12" md="12">
                        <Field
                          name="shortDes"
                          label="Short Description"
                          component={InputField}
                        />
                      </Col>

                      <Col xs="12" md="12">
                        <Field
                          name="contents"
                          label="Contents"
                          component={TextareaField}
                        />
                      </Col>

                      <Col xs="12" md="12">
                        <Field
                          name="status"
                          label="Status"
                          component={InputField}
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

ProductModal.defaultProps = {
  isEdit: false,
  isAdd: false,
  toggleEdit: () => { },
  toggleAdd: () => { },
  food: {},
  onAdd: () => { },
  onEdit: () => { },
}

export default ProductModal
