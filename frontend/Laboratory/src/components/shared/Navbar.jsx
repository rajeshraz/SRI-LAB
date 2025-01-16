import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/chatbot">Chatbot</Link>
      <Link to="/datasheet">Datasheet</Link>
    </nav>
  );
};

export default Navbar;
