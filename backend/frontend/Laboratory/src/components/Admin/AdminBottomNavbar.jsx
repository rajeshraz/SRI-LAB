import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./adminstylings/adminbotomnavbar.css";

const AdminBottomNavbar = () => {
  const location = useLocation();

  return (
    <div className="bottom-navbar">
      <Link 
        to="/admin/home" 
        className={location.pathname === '/admin/home' ? 'active' : ''}
      >
        🏠 Home
      </Link>
     
      <Link 
        to="/admin/status"
        className={location.pathname === '/admin/status' ? 'active' : ''}
      >
        📊 Status
      </Link>
    </div>
  );
};

export default AdminBottomNavbar;

