import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AdminLogin from "./components/Admin/Login";
import AdminAlerts from "./components/Admin/Alerts";
import UserHome from "./components/User/Home";
import BookingForm from "./components/User/BookingForm";
import BottomNavbar from "./components/BottomNavbar";
import AdminBottomNavbar from "./components/Admin/AdminBottomNavbar";
import Chatbot from "./components/User/Chatbot";
import Datasheet from "./components/User/Datasheet";
import Profile from "./components/User/Profile";
import Status from "./components/Admin/Status";

const App = () => {
  const ShowNavbar = () => {
    const location = useLocation();
    const hideNavbarPaths = ['/', '/admin/login'];
    const adminPaths = ['/admin/home', '/admin/chatbot', '/admin/datasheet', '/admin/status'];
    
    if (hideNavbarPaths.includes(location.pathname)) {
      return null;
    }
    
    if (adminPaths.includes(location.pathname)) {
      return <AdminBottomNavbar />;
    }
    
    return <BottomNavbar />;
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/home" element={<AdminAlerts />} />
          <Route path="/admin/status" element={<Status />} />
          <Route path="/user/home" element={<UserHome />} />
          <Route path="/user/book" element={<BookingForm />} />
          <Route path="/user/chatbot" element={<Chatbot />} />
          <Route path="/user/datasheet" element={<Datasheet />} />
          <Route path="/user/profile" element={<Profile />} />
        </Routes>
        <ShowNavbar />
      </div>
    </Router>
  );
};

export default App;

