import Thumbs from 'components/thumbs/Thumbs';
import { validationCate, validationCateEdit } from 'const/validateSchema';
import InputField from 'CustomFields/InputField/InputField';
import { Field, Form, Formik } from 'formik';
import hooks from 'hooks';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge, Button, Col,
  FormGroup, FormText,
  Input, ListGroup,
  ListGroupItem, Row,
  Spinner, Toast, ToastBody, ToastHeader
} from 'reactstrap';
import { addCategory, deleteCategory, editCategory, getAllCategory, getCateDetail } from 'redux/actions/categoryActions';
import getProduct from 'redux/selector/getProduct';
import Swal from 'sweetalert2';

import { FaDownload, FaClipboardList } from "react-icons/fa";

const { useProducts, useCategory } = hooks;

const Categories = (props) => {
  const dispatch = useDispatch();
  const cateReducer = useSelector(state => state.categoryReducer);
  const { cateList, cateDetail, isGettingCate, isAdding, isDeleting, isUpdating, isGettingDetail } = cateReducer;
  const productList = getProduct();

  const [isEdit, setisEdit] = useState(false);
  const [isAdd, setisAdd] = useState(true);

  useCategory();
  useProducts();


  const getNumberOfProduct = (id) => {
    const products = productList.filter(el => el.cateId === id);
    return products && products.length;
  }

  const checkExits = (value) => {
    let error;
    if (!cateList.every(el => el.name.toLowerCase().trim() !== value.toLowerCase().trim())) {
      error = 'The name already exists excel';
    }
    return error;
  }

  const toggleAdd = () => {
    setisAdd(true);
    setisEdit(false);
    dispatch(getAllCategory())
  }

  const toggleEdit = (values) => {
    setisEdit(true);
    setisAdd(false);
    dispatch(getCateDetail({ values }));
  }

  const onSubmitAdd = (values) => {
    setisAdd(true);
    setisEdit(false);
    dispatch(addCategory({ values }));
  }

  const onSubmitDelete = (values) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        dispatch(deleteCategory({ values }));
      }
    })

  }

  const onSubmitEdit = (values) => {
    console.log('edit', values);
    dispatch(editCategory({ values }));
  }


  const renderCate = () => {
    if (isGettingCate || isDeleting || isAdding || isUpdating) {
      return (
        <div>
          <Spinner type="grow" color="primary" />
        </div>
      )
    }

    return cateList && cateList.map(x => (
      <Row key={x.id}>
        <Col xs="12" md="10">
          <ListGroupItem key={x.id}>
            <Row>
              <Col>
                <img src={x.image} style={{ width: '100px', display: 'block' }} alt="oops" />
              </Col>
              <Col>
                {x.name}
              </Col>
              <Col>
                <Badge color="primary">Món ăn: </Badge> {getNumberOfProduct(x.id)}
              </Col>
            </Row>
          </ListGroupItem>
        </Col>
        <Col xs="12" md="2">
          {x.id !== 4 ? <Badge color="info" style={{ cursor: 'pointer' }} onClick={() => toggleEdit(x)}>Edit</Badge> : ''}{' '}
          {x.id !== 4 ? <Badge color="danger" style={{ cursor: 'pointer' }} onClick={() => onSubmitDelete(x)} >Delete</Badge> : ''}
        </Col>
      </Row>
    ))
  }

  const renderForm = () => {
    if (isGettingDetail || isGettingCate || isUpdating) {
      return <Spinner color="info"></Spinner>
    }

    return (
      <Formik
        validationSchema={isEdit ? validationCateEdit : validationCate}
        initialValues={
          isEdit ? cateDetail : { name: '', image: '' }
        }
        validateOnBlur={false}
        validateOnChange={true}
        onSubmit={(values, { resetForm }) => {
          isEdit ? onSubmitEdit(values) : onSubmitAdd(values);
          isAdd ? resetForm({ name: '', image: '' }) : resetForm(cateDetail);
        }}
      >
        {formikProps => {
          const { values, errors, setFieldValue } = formikProps;
          // console.log(values);
          return (
            <Form>
              <Field
                name="name"
                label="Name"
                placeholder="input"
                component={InputField}
                validate={isEdit ? false : checkExits}
              />

              <FormGroup>
                <Input
                  type="file"
                  name="image"
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files[0]);
                  }}
                />
                <Thumbs file={values.image} />

                <FormText color="muted">
                  {errors['image'] ? <span className="text-danger">{errors['image']}</span> : "Remember after submit the file input might not display resest value"}
                </FormText>
              </FormGroup>

              {isEdit ? <Button color="danger" type="submit" className="mt-3 px-4"><FaDownload /></Button> : <Button color="info" type="submit" className="mt-3 px-4"><FaDownload /></Button>}
            </Form>
          )
        }}
      </Formik>)
  }

  return (
    <div className="p-3">

      <h1 className="p-3" onClick={toggleAdd}>{isAdd ? 'Categories' : 'Edit Category'}</h1>

      <Row>
        <Col md="5" className="bg-ligh">
          {renderForm()}
        </Col>
        <Col md="7">
          <Toast>
            <ToastHeader icon={<FaClipboardList />}>
              Menu
              </ToastHeader>
            <ToastBody>
              Danh mục các món ăn của nhà hàng
            </ToastBody>
          </Toast>
          <ListGroup>
            {renderCate()}
          </ListGroup>
        </Col>
      </Row>

    </div>
  )
}
export default Categories;