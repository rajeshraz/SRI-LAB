import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./BottomNavbar.css";

const BottomNavbar = () => {
  const location = useLocation();

  return (
    <div className="bottom-navbar">
      <Link 
        to="/user/home" 
        className={location.pathname === '/user/home' ? 'active' : ''}
      >
        🏠 Home
      </Link>
      <Link 
        to="/user/chatbot"
        className={location.pathname === '/user/chatbot' ? 'active' : ''}
      >
        🤖 Chatbot
      </Link>
      <Link 
        to="/user/datasheet"
        className={location.pathname === '/user/datasheet' ? 'active' : ''}
      >
        📋 Datasheet
      </Link>
      <Link 
        to="/user/profile"
        className={location.pathname === '/user/profile' ? 'active' : ''}
      >
        👤 Founder 
      </Link>
    </div>
  );
};

export default BottomNavbar;

