import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Medical Report Scanner</h1>
        <ul className="flex space-x-4">
          <li><a href="/" className="text-white hover:underline">Home</a></li>
          <li><a href="/about" className="text-white hover:underline">About</a></li>
          <li><Link to="/login" className="text-white hover:underline">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;