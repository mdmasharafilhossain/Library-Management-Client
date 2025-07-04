import React, { useState } from 'react';
import { FiXSquare } from "react-icons/fi";
import { FiAlignJustify } from "react-icons/fi";
import logo from '../../assets/Logo.png'
export default function Navbar() {
 
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    
    <nav className="bg-blue-50 p-1 shadow-md rounded-b-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
         
          <img src={logo} alt="Logo"  className='w-18 h-16 ml-5' />
        </div>

      
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

       
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md"
            aria-label="Toggle navigation"
          >
          
            {isOpen ? (
              <FiXSquare className='w-8 h-8'/>
            ) : (
             <FiAlignJustify className='w-8 h-8'/>
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
            onClick={toggleMenu} 
          >
            All Books
          </a>
          <a
            href="#"
            className="block text-blue-700 text-lg font-medium px-4 py-3 hover:bg-blue-200 transition duration-300 ease-in-out rounded-md"
            onClick={toggleMenu} 
          >
            Add Book
          </a>
          <a
            href="#"
            className="block text-blue-700 text-lg font-medium px-4 py-3 hover:bg-blue-200 transition duration-300 ease-in-out rounded-md"
            onClick={toggleMenu} 
          >
            Borrow Summary
          </a>
        </div>
      )}
    </nav>
  );
}
