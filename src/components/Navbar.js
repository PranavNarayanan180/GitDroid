import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo">GITDROID</div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/customize">Customize</Link></li>
        <li><Link to="/resale">Resale</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
    </header>
  );
};

export default Navbar;

