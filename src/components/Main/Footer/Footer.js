import React from 'react';
import { Col, Container, Row } from 'reactstrap';

const Footer = props => {
  return (
    <Container className="footer-main">

      <Row className="firstfooterrow">
        <Col xs="12" md="7" className="bottom-nav">
          <Row>
            <Col md="3">
              <h5>MAIN</h5>
            </Col>
            <Col md="3">
              <h5>PRODUCT</h5>
            </Col>
            <Col md="3">
              <h5>PRESS</h5>
            </Col>
            <Col md="3">
              <h5>LEGAL</h5>
            </Col>
          </Row>

          <Row>
            <Col md="3">
              <ul>
                <li>Blog</li>
                <li>FAQs</li>
                <li>Support</li>
                <li>Abou Us</li>
              </ul>
            </Col>
            <Col md="3">
              <ul>
                <li>Login</li>
                <li>Personal</li>
                <li>Business</li>
                <li>Team</li>
              </ul>
            </Col>
            <Col md="3">
              <ul>
                <li>Logos</li>
                <li>Events</li>
                <li>Stories</li>
                <li>Office</li>
              </ul>
            </Col>
            <Col md="3">
              <ul>
                <li>GDPR</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Disclainmer</li>
              </ul>
            </Col>
          </Row>
        </Col>

        <Col xs="12" md="4" className="subscribe-box" >
          <Row>
            <Col md="12">
              <h5>SUBSCRIBE TO OUR NEWSLETTER</h5>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <p>We deliver high quality blog posts written by professionals weekly. And we promise no spam.</p>
            </Col>
          </Row>

          <Row>
            <Col md="12" >
              <div className="d-flex subcribe-form" >
                <input className="w-100" type="text" />
                <button className="px-5">Subscribe</button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
      </Row>

    </Container>
  )
}

Footer.propTypes = {

}

export default Footer
