import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from '../../../../redux/actions/authActions';
import { Formik, Form, Field } from 'formik';

import { Redirect } from 'react-router-dom';



const Login = props => {

  const dispatch = useDispatch();
  const authReducer = useSelector(state => state.authReducer);
  const { isLogin } = authReducer;

  if (isLogin) {
    return <Redirect to="/" />;
  }

 

  return (
    <div className="container">
      {/* Outer Row */}
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* Nested Row within Card Body */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <Formik
                      initialValues={{ username: '', password: '' }}
                      onSubmit={values => {
                          dispatch(loginAction({values}));
                        // console.log(values);
                      }}
                    >
                      {({ values, }) => (
                        <Form className="user">
                          <div className="form-group">
                            <Field type="text"
                              name="username"
                              className="form-control form-control-user"
                              placeholder="Enter Email Address..."
                            />
                          </div>

                          <div className="form-group">
                            <Field type="text"
                              name="password"
                              className="form-control form-control-user"
                              placeholder="Password"
                            />
                          </div>

                          <div className="form-group">
                            <div className="custom-control custom-checkbox small">
                              <input type="checkbox" className="custom-control-input" id="customCheck" />
                              <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                            </div>
                          </div>
                          <button type="submit" className="btn btn-primary btn-user btn-block">
                            Login
                          </button>
                          <hr />
                          <a href="index.html" className="btn btn-google btn-user btn-block">
                            <i className="fab fa-google fa-fw" /> Login with Google
                          </a>
                          <a href="index.html" className="btn btn-facebook btn-user btn-block">
                            <i className="fab fa-facebook-f fa-fw" /> Login with Facebook
                          </a>
                        </Form>
                      )}

                    </Formik>
                    <hr />
                    <div className="text-center">
                      <a className="small" href="forgot-password.html">Forgot Password?</a>
                    </div>
                    <div className="text-center">
                      <a className="small" href="register.html">Create an Account!</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

Login.propTypes = {

}

export default Login
