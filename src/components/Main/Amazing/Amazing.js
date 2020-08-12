import React from 'react';
import { BsArrowRight } from "react-icons/bs";
import { Col, Row } from 'reactstrap';

const Amazing = props => {
  return (
    <div className="amazing-master p-2">
      <Row>
        <Col md="12">
          <h1 className="text-center">Amazing Services.</h1>
        </Col>
      </Row>

      <Row className="px-4">
        <Col md="4">
          <div className="card-amazing location-card">
            <img src="https://treact.owaiskhan.me/static/media/shop-icon.6c8f89cc.svg" alt="oops" />
            <h5 className="text-center">+230 Location</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, nostrum.</p>
            <a href="!#">Read more <BsArrowRight/></a>
          </div>

        </Col>
        <Col md="4">
          <div className="card-amazing chef-card">
            <img src="https://treact.owaiskhan.me/static/media/chef-icon.09cc57a3.svg" alt="oops" />
            <h5 className="text-center">Professional Chefs</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, nostrum.</p>
            <a href="!#">Read more <BsArrowRight/></a>
          </div>
        </Col>
        <Col md="4">
          <div className="card-amazing location-card">
            <img src="https://treact.owaiskhan.me/static/media/celebration-icon.daa6dd44.svg" alt="oops" />
            <h5 className="text-center">Birthday Catering</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, nostrum.</p>
            <a href="!#">Read more <BsArrowRight/></a>
          </div>
        </Col>
      </Row>
    </div>
  )
}

Amazing.propTypes = {

}

export default Amazing
