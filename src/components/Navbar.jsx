import React from 'react';
import './Navbar.css';
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">YourLogo</a>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link">About</a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="nav-link">Contact</a>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-link">Login</a>
          </li>
          <li className="nav-item">
            <a href="/register" className="nav-link">Register</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;