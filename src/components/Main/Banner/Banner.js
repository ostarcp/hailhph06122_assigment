import React from 'react';
import { Col, Row } from 'reactstrap';
const Banner = props => {
  return (
    <div className="banner">
      <Row className="first-banner" style={{ marginBottom: '100px' }}>
        <Col xs="12" md="6" className="banner-left">
          <h1 className="h1">Delicious & Affordable</h1>
          <h1><span className="meal-h1">Meals Near You.</span></h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <div className="order-now">
            <button>Order Now</button> {' '}
            <span className="chef-btn">Meet the chef</span>
          </div>
        </Col>

        <Col xs="12" md="6" className="right-banner">
          <img className="w-100" src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80" alt="opps" />
        </Col>
      </Row>

      <Row className="second-banner">
        <Col xs="12" md="6" className="left-banner">
          <img className="w-100" src="https://images.unsplash.com/photo-1460306855393-0410f61241c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80" alt="opps" />
        </Col>

        <Col xs="12" md="6" className="banner-right">
          <span className="text-primary">Established Since 2014</span>
          <h1 className="h1">We've been serving for</h1>
          <h1><span className="meal-h1">Over 5 years.</span></h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br /> <br /> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <div className="order-now">
            <button>Order Now</button> {' '}
          </div>
        </Col>
      </Row>
    </div>
  )
}

Banner.propTypes = {

}

export default Banner
