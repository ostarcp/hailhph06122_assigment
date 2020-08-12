import React from 'react';
import Sidebar from '../../components/Admin/Sidebar';
import Topbar from '../../components/Admin/Topbar';
import Footer from '../../components/Admin/Footer';
import { NotificationContainer } from 'react-notifications';


import '../../assets/css/admin/sb-admin-2.min.scss';
import '../../assets/fontawesome-free/css/all.min.css';
import '../../assets/css/admin/main.scss';

const LayoutAdmin = ({children}) => {
  return (
    <div className="admin-page">
      <div id="wrapper">
      <NotificationContainer />
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />
            <div className="container-fluid">
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}



export default LayoutAdmin
