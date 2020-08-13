import React, { useState } from 'react';
import { FaUtensils } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Spinner, FormGroup, Input, Label, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import actions from 'redux/actions';
import Paginate from 'components/Main/Paginate/Paginate';
import getCategory from 'redux/selector/getCategory';


const Shop = props => {
  const dispatch = useDispatch();
  const { getProductByCateId, getAllProduct, filterProductAction } = actions;

  const cateList = getCategory();

  const productReducer = useSelector(state => state.productReducer);
  const { productsList, isGettingPD, productListByCateId, isGettingPdByCate } = productReducer;


  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const paginate = (pageNumber) => setcurrentPage(pageNumber);

  function currencyFormat(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' vnđ'
  }

  const getProductByCate = (values) => {
    dispatch(getProductByCateId({ values }));
  }


  const filterProduct = (e) => {
    const { value, name } = e.target;
    dispatch(filterProductAction({ action: value, name }));
    //console.log(value);
  }

  const renderProduct = () => {
    const indexOfLastPD = currentPage * itemsPerPage;
    const indexOffFirstPD = indexOfLastPD - itemsPerPage;

    if (isGettingPD || isGettingPdByCate) {
      return <Spinner color="primary"></Spinner>
    }


    if (productListByCateId && productListByCateId.length > 0) {
      return (
        <React.Fragment>
          <div className="item-wrapper">
            {
              productListByCateId && productListByCateId.map(x => (
                <div className="items-shop" key={x.id}>
                  <Link to={`/chi-tiet-san-pham/${x.id}`}>
                    <img src={x.image} alt="oops" />
                    <div className="item-info">
                      <h5><strong>{x.name}</strong></h5>
                      <p>{currencyFormat(x.price)}</p>
                      <small>{x.shortDes}</small>
                    </div>
                    <div className="item-options">
                      <button className="btn-checking">Tùy chỉnh</button>
                      <button className="btn-order">Đặt hàng</button>
                    </div>
                  </Link>
                </div>
              ))
            }
          </div>
        </React.Fragment>
      )
    }


    if (productListByCateId && productListByCateId.length <= 0) {
      return <h3>Không có sản phẩm nào</h3>
    }

    return (
      <React.Fragment>
        <div className="item-wrapper">
          {
            productsList && productsList.slice(indexOffFirstPD, indexOfLastPD).map(x => (
              <div className="items-shop" key={x.id}>
                <Link to={`/chi-tiet-san-pham/${x.id}`}>
                  <img src={x.image} alt="oops" />
                  <div className="item-info">
                    <h5><strong>{x.name}</strong></h5>
                    <p>{currencyFormat(x.price)}</p>
                    <small>{x.shortDes}</small>
                  </div>
                  <div className="item-options">
                    <button className="btn-checking">Tùy chỉnh</button>
                    <button className="btn-order">Đặt hàng</button>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
        <div className="d-flex justify-content-center">
          <Paginate
            currentPage={currentPage}
            itemsPerPage={itemsPerPage} 
            totalItem={productsList.length}
            paginate={paginate}
          />
        </div>
      </React.Fragment>
    )
  }



  return (
    <div className="shop">
      <Row className="banner-wrapper">
        <Col xs="12" md="10">
          <div className="shop-banner">
            <img src="https://www.hoteljob.vn/uploads/images/18-09-18-15/menu-la-gi2.jpg" alt="" />
          </div>
        </Col>
        <Col xs="12" md="2">
          <div className="shop-text">
            <h1>Our Menu</h1>
            <h3><FaUtensils /></h3>
            <ul>
              <li>APPETIZER</li>
              <li>MAIN COURSES</li>
              <li>DRINKS & JUICES</li>
            </ul>
          </div>
        </Col>
      </Row>


      <Row>
        <Col md="3"></Col>

        <Col md="9">
          <Row>
            <Col md="4" className="d-flex justify-content-end align-items-center"><Badge color="secondary">filter</Badge></Col>
            <Col md="4">
              <FormGroup>
                <Label for="exampleSelectMulti">Lọc bởi giá</Label>
                <Input type="select" name="pricefilter" onChange={filterProduct}>
                  <option value="defaut">Mặc định</option>
                  <option value="desc">Từ cao đến thấp</option>
                  <option value="asc">Từ thấp đến cao</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label for="exampleSelectMulti">Lọc bởi tên</Label>
                <Input type="select" name="namefilter" onChange={filterProduct}>
                  <option value="defaut">Mặc định</option>
                  <option value="desc">A-Z</option>
                  <option value="asc">Z-A</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col xs="12" md="3">
          <p>Danh mục</p>
          <ul className="menu-nav">
            <li className="menu-item" onClick={() => dispatch(getAllProduct())}>
              Tất cả các món
            </li>
            {cateList && cateList.map(x => (
              <li className="menu-item " key={x.id} onClick={() => getProductByCate(x)}>
                {x.name}
              </li>
            ))}

          </ul>
        </Col>

        <Col xs="12" md="9">
          {renderProduct()}
        </Col>

      </Row>

    </div>
  )
}

Shop.propTypes = {

}

export default Shop
