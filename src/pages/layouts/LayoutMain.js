import React from 'react';
import { Container } from 'reactstrap';
import Footer from 'components/Main/Footer/Footer';
import Navbar from 'components/Main/Navbar/Navbar';
import ScrollTop from 'components/Main/SrcollToTopButton/SrcollToTopBtn';
import { NotificationContainer } from 'react-notifications';

import hooks from 'hooks';

const { useCart, useProducts, useCategory } = hooks;

const LayoutMain = ({children}) => {
//console.log('childen',children)
useCart();
useCategory();
useProducts();

  return (
     <Container >
        <Navbar />
        <NotificationContainer />
        <div className="content">
            {children}
        </div>
        <ScrollTop />
       
        <Footer />
    </Container>
  )
}

LayoutMain.propTypes = {

}

export default LayoutMain
