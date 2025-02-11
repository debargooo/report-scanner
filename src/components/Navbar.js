import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/entire_logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-white to-teal-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <img src={logo} className="h-12 w-auto" alt="Logo" />

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10">
          <li>
            <Link to="/" className="text-white hover:underline font-semibold text-xl">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:underline font-semibold text-xl">
              About
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-white hover:underline font-semibold text-xl">
              Login
            </Link>
          </li>
        </ul>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col space-y-4 mt-4 bg-white shadow-lg rounded-lg p-4">
          <li>
            <Link to="/" className="text-teal-700 font-semibold text-lg" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-teal-700 font-semibold text-lg" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-teal-700 font-semibold text-lg" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
