import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Alert, Button, FormGroup, Input, Card, Badge,Spinner } from 'reactstrap';
import { useParams } from 'react-router-dom';
import hooks from 'hooks';
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from 'redux/actions/productActions';
import { addTocart } from 'redux/actions/cartActions';
import { FaCartArrowDown, FaPlusSquare } from "react-icons/fa";
import getCate from 'redux/selector/getCategory';
import { Formik, Form } from 'formik';


//const { useCategory, useProducts } = hooks;

const Detail = props => {

  const { id } = useParams();
  const dispatch = useDispatch();

  const productReducer = useSelector(state => state.productReducer);
  const { productDetail, isGettingPdDetail, productsList } = productReducer;
  const cateList = getCate();


  useEffect(() => {
    dispatch(getProductDetail({ id }));
  }, [])

  function currencyFormat(num) {
    return num && num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' vnđ'
  }

  const renderContents = (values) => {
    let contents = values;

    if(isGettingPdDetail) {
      return <Spinner color="danger"></Spinner>
    }
    return (
      <div dangerouslySetInnerHTML={{ __html: contents }} />
    )
  }

  const getCateName = (cateId) => {
    const cateName = cateList.find(x => x.id === cateId);
    if (!cateName) {
      return <Badge color="primary">uncategorized</Badge>
    }
    return cateName && <img src={cateName.image} style={{ width: '100px', borderRadius: '50px' }} alt="oops" />
  }


  const renderSamePD = (cateId, pdId) => {
    const sameProduct = productsList.filter(x => x.id !== pdId);
    const newPd = sameProduct.slice(0, 3).filter(x => x.cateId === cateId);

    const count = { quanity: 1 };
    return newPd && newPd.map(x => (
      <div className="same-products my-2" key={x.id}>
        <Card>
          <Row>
            <Col md="4">
              <img src={x.image} style={{ width: '200px' }} alt="" />
            </Col>

            <Col md="6">
              <h4>{x.name}</h4>
            </Col>

            <Col md="2">
              <p>{currencyFormat(x.price)}</p>
              <Button color="primary" onClick={() => onAddtoCart({ productDetail: x, count: count })}><FaPlusSquare /></Button>
            </Col>
          </Row>
        </Card>

      </div>
    ));
  }


  window.scrollTo({ top: 0, behavior: 'smooth' });

  const onAddtoCart = (values) => {
    dispatch(addTocart({ values }));
  }

  return (
    <Container className="p-4 mt-5">
      <Row className="product-details-wrapper">
        <Col xs="12" md="8" className="product-left-wrapper">
          <h1>{productDetail.name}</h1>
          <Alert color="dark">
            Chi tiết sản phẩm
            </Alert>
          <div className="productDetail-contents">
            {renderContents(productDetail.contents)}
          </div>
          <Alert color="dark">
            Sản phẩm Liên quan
          </Alert>
          <div>
            {renderSamePD(productDetail.cateId,productDetail.id)}
          </div>
        </Col>

        <Col xs="12" md="4" className="product-right-wrapper">

          <div className="product-info p-3 ">
            <img src={productDetail.image} className="w-100" alt="" />
            <p className="product-name"> 1x {productDetail.name} </p>
            <p className="product-shortDes">{productDetail.shortDes}</p>
            <p className="product-price">Đơn giá: {currencyFormat(productDetail.price)}</p>
            <p className="product-price">Sale: {currencyFormat(productDetail.salePrice)}</p>
            <span><strong>Thể Loại: </strong> {getCateName(productDetail.cateId)}</span>
          </div>
          <hr />
          <Formik
            initialValues={{ quanity: 1 }}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={values => {
              const count = values;
              onAddtoCart({ productDetail, count, action: 'up' })
            }}
          >
            {formikProps => {
              const {
                values,
                handleChange,
                handleBlur,
              } = formikProps;

              //console.log(values)

              return (
                <Form>
                  <div>
                    <Row>
                      <Col md="3">
                        <Badge color="secondary">Số lượng: </Badge>
                      </Col>
                      <Col md="9">
                        <FormGroup>
                          <Input type="number"
                            name="quanity"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.quanity}
                          />
                        </FormGroup>
                      </Col>

                    </Row>
                  </div>
                  <hr />
                  <div className="product-checkout p-3">
                    <Button color="primary" type="submit" size="lg" block >THÊM VÀO GIỎ HÀNG <FaCartArrowDown /></Button>
                    <Button color="light" size="lg" block>QUAY LẠI THỰC ĐƠN</Button>
                  </div>
                </Form>
              )
            }}
          </Formik>
        </Col>
      </Row>

    </Container>
  )
}

//onClick={() => onAddtoCart(productDetail)}

export default Detail
