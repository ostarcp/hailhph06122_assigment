import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PivateRoute';
import LayoutAdmin from '../pages/layouts/LayoutAdmin'
//Admin
import Dashboard from '../pages/views/Admin/Dashboard'
import ProductManager from '../pages/views/Admin/Products/Products'
import Categories from '../pages/views/Admin/Categories/Categories'
import Posts from 'pages/views/Admin/Posts/Posts';
//Main 
import LayoutMain from 'pages/layouts/LayoutMain';
import Home from 'pages/views/Main/Home/Home';
import ShoppingCart from 'pages/views/Main/Cart/ShopingCart';
import Login from 'pages/views/Main/Login/Login';
import Shop from 'pages/views/Main/Shop/Shop';
import Detail from 'pages/views/Main/Detail/Detail';
import Contact from 'pages/views/Main/Contact/Contact';
import PostPage from 'pages/views/Main/Posts/Posts';

const Routers = props => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/admin/:path?/:path?" exact>
          <LayoutAdmin>
            <Switch>
              <Route path='/admin' exact>
                <Dashboard />
              </Route>

              <Route path='/admin/products'>
                <ProductManager />
              </Route>

              <Route path='/admin/categories'>
                <Categories />
              </Route>
              <Route path='/admin/posts'>
                <Posts />
              </Route>

            </Switch>
          </LayoutAdmin>
        </Route>

        <Route>
          <LayoutMain>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>

             
                <Route path="/shop">
                  <Shop />
                </Route>
                
                <Route path="/cart">
                  <ShoppingCart />
                </Route>

                <Route path="/contact">
                  <Contact />
                </Route>
                <Route path="/posts">
                  <PostPage />
                </Route>
                
                <Route path="/chi-tiet-san-pham/:id">
                  <Detail />
                </Route>
        

            </Switch>
          </LayoutMain>
        </Route>



      </Switch>

    </Router>
  )
}

Routers.propTypes = {

}

export default Routers
