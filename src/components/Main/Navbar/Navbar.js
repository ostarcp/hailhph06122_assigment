import React from 'react';
import { RiShoppingCartLine } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, Button, Col, Row } from 'reactstrap';
import selectCart from 'redux/selector/getCart';
import applogo from '../../../applogo.svg';

const Navbar = (props) => {


  const authReducer = useSelector(state => state.authReducer);
  const { isLogin } = authReducer;
  const cartCount = selectCart();

  const renderLoginBox = () => {
    const username = localStorage.getItem('username');
    if (isLogin) {
      return <Col xs="12" md="4" className="login-box">
        <span className="mr-2">{username}</span>
        <Link to="/cart">
          <Button color="primary" className="px-4">
            <RiShoppingCartLine /> <Badge color="light">{cartCount.length}</Badge>
          </Button>
        </Link>
      </Col>
    }
    return <Col xs="12" md="4" className="login-box">
      <span className="mr-2"><Link to="/login">Login</Link></span>
      <Button color="primary" className="px-4">Sign Up</Button>
    </Col>
  }

  return (
    <div className="main-nav container">
      <Row>
        <Col xs="12" md="5" className="logo">
          {/* <span>logo</span> */}
          <Link to="/admin"><img src={applogo} alt="s" width="39px" /></Link>
        </Col>

        <Col xs="12" md="7">
          <Row>
            <Col xs="12" md="8" >
              <ul className="navbar">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
                <li>
                  <Link to="/posts">Posts</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </Col>

            {renderLoginBox()}

          </Row>
        </Col>
      </Row>

    </div>
  )
}

// Navbar.propTypes = {

// }

export default Navbar
