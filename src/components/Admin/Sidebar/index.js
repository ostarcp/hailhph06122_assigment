import React from 'react'
import { Link } from 'react-router-dom';
import { routes } from 'routes/routes';

const Sidebar = props => {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            {/* Sidebar - Brand */}
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink" />
                </div>
                <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </Link>
            <hr className="sidebar-divider my-0" />

            <li className="nav-item">
                <Link className="nav-link" to="/admin">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span>Dashbroad</span>
                </Link>
            </li>
            {routes && routes.map(x => (
                <li className={`nav-item`} key={x.name}>
                    <Link className="nav-link" to={`/admin/${x.path}` }>
                        <i className={x.icon} />
                        <span>{x.name}</span>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default Sidebar
