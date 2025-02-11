import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/entire_logo.png';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-white to-teal-600 p-4 ">
      <div className="container mx-auto flex justify-between items-center">
          <img src={logo} className="h-12 w-15" alt="Logo" />
        
        <ul className="flex space-x-10">
          <li><a href="/" className="text-white hover:underline font-semibold text-xl">Home</a></li>
          <li><a href="/about" className="text-white hover:underline font-semibold text-xl">About</a></li>
          <li><Link to="/login" className="text-white hover:underline font-semibold text-xl">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
