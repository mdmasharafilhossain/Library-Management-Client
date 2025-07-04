import React, { useState } from 'react';

// Main Navbar component
export default function Navbar() {
  // State to manage the mobile menu's open/close status
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // Navbar container with a very light blue background, padding, and subtle shadow
    <nav className="bg-blue-50 p-4 shadow-md rounded-b-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          {/* Logo text with a vibrant blue color and modern font */}
          <span className="text-blue-700 text-3xl font-extrabold font-inter tracking-wide">
            BookFlow
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <a
            href="#"
            className="text-blue-600 text-lg font-semibold hover:text-blue-800 transition duration-300 ease-in-out transform hover:scale-105 px-3 py-2 rounded-md hover:bg-blue-100"
          >
            All Books
          </a>
          <a
            href="#"
            className="text-blue-600 text-lg font-semibold hover:text-blue-800 transition duration-300 ease-in-out transform hover:scale-105 px-3 py-2 rounded-md hover:bg-blue-100"
          >
            Add Book
          </a>
          <a
            href="#"
            className="text-blue-600 text-lg font-semibold hover:text-blue-800 transition duration-300 ease-in-out transform hover:scale-105 px-3 py-2 rounded-md hover:bg-blue-100"
          >
            Borrow Summary
          </a>
        </div>

        {/* Mobile Menu Button (Hamburger Icon) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md"
            aria-label="Toggle navigation"
          >
            {/* Hamburger icon when menu is closed, 'X' icon when open */}
            {isOpen ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Links (conditionally rendered based on isOpen state) */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-blue-100 rounded-lg shadow-inner py-2">
          <a
            href="#"
            className="block text-blue-700 text-lg font-medium px-4 py-3 hover:bg-blue-200 transition duration-300 ease-in-out rounded-md"
            onClick={toggleMenu} // Close menu on link click
          >
            All Books
          </a>
          <a
            href="#"
            className="block text-blue-700 text-lg font-medium px-4 py-3 hover:bg-blue-200 transition duration-300 ease-in-out rounded-md"
            onClick={toggleMenu} // Close menu on link click
          >
            Add Book
          </a>
          <a
            href="#"
            className="block text-blue-700 text-lg font-medium px-4 py-3 hover:bg-blue-200 transition duration-300 ease-in-out rounded-md"
            onClick={toggleMenu} // Close menu on link click
          >
            Borrow Summary
          </a>
        </div>
      )}
    </nav>
  );
}
