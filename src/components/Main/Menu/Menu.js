import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Col, Container, Row, Spinner } from 'reactstrap';

const Menu = props => {

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const productReducer = useSelector(state => state.productReducer);
  const categoryReducer = useSelector(state => state.categoryReducer);


  const {
    productsList,
    isGettingPD
  } = productReducer;

  const {
    cateList
  } = categoryReducer;

  const renderName = (cateId) => {
    let cateName = cateList.find(x => x.id === cateId);
    return cateName && <p className="items-recipe">{cateName.name}</p>
  }


  //const paginate = (pageNumber) => setcurrentPage(pageNumber);

  function currencyFormat(num) {
    return num && num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' vnđ'
  }

  const renderPD = () => {

    const indexOfLastPD = currentPage * itemsPerPage;
    const indexOffFirstPD = indexOfLastPD - itemsPerPage;

    if (isGettingPD) {
      return <Spinner color="primary"></Spinner>
    }

    if (productsList.length <= 0) {
      return <p>empty</p>
    }


    return productsList.slice(indexOffFirstPD, indexOfLastPD).map(pd => (
      <Col xs="12" md="4" key={pd.id}>
        <div className="menu-items">
          <Link to={`/chi-tiet-san-pham/${pd.id}`}>
            <img src={pd.image} alt="cc" />
            <div className="menu-price">
              {renderName(pd.cateId)}
              <p className="items-recipe">{pd.name}</p>
              <p className="items-price">{currencyFormat(pd.price)}</p>
            </div>
          </Link>
        </div>
      </Col>
    ))
  }

  return (
    <Container>
      <Row className="checkout-menu">
        <Col xs="12" md="6">
          <h1>Checkout our <span className="menu-label">menu</span></h1>
        </Col>
        <Col xs="12" md="6">
          {/* <h1>Checkout our menu</h1> */}
        </Col>
      </Row>

      <Row className="menu-list">
        {renderPD()}
      </Row>

      <Row>
        {/* <Paginate
          itemsPerPage={itemsPerPage}
          totalItem={productsList.length}
          paginate={paginate}
        /> */}
      </Row>


    </Container>
  )
}

Menu.defaultProps = {

}

export default Menu
