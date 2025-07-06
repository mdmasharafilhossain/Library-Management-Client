import React from 'react';
import { NavLink } from 'react-router';
import logo from '../../assets/logo.png'
const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-400 text-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-16 rounded-t-xl shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex gap-2 items-center mb-4">
            <img src={logo} alt="Logo" className='w-12 h-12 text-white' />
           <span className="text-3xl font-extrabold text-white">BookStation</span>
          </div>
          <p className="text-sm leading-relaxed max-w-md">
            Your ultimate destination for managing and discovering books. Explore, borrow, and keep track of your literary journey with ease.
          </p>
        </div>

        <div className="col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-semibold text-white mb-4 border-b-2 border-white pb-1">Quick Links</h3>
          <ul className="space-y-2">
            <li><NavLink to="/books" className="text-gray-100 hover:text-white transition duration-300">All Books </NavLink></li>
            <li><NavLink to="/add-book" className="text-gray-100 hover:text-white transition duration-300">Add Book</NavLink></li>
            <li><NavLink to="/borrow-summary" className="text-gray-100 hover:text-white transition duration-300">Borrow Summary</NavLink></li>
            
          </ul>
        </div>

        <div className="col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-semibold text-white mb-4 border-b-2 border-white pb-1">Contact</h3>
          <ul className="space-y-2">
            <li><span className="text-gray-100">MD Mashrafil Hossain Mahi</span></li>
            <li><span className="text-gray-100">Web Developer</span></li>
            <li className="text-gray-100 hover:text-white transition duration-300">Email: mashrafilmahi007@gmail.com</li>
            <li className="text-gray-100 hover:text-white transition duration-300">Phone: +8801641749267</li>
          </ul>
        </div>
      </div>

      <hr className="border-gray-300 my-6 max-w-7xl mx-auto" />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <p className="text-sm text-white mb-4 sm:mb-0">
          &copy; 2025 BookStation. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <NavLink to="#" className="text-white hover:text-gray-100 transition transform hover:scale-110">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </NavLink>
          <NavLink to="#" className="text-white hover:text-gray-100 transition transform hover:scale-110">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.007-.532A8.318 8.318 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.11 4.11 0 001.804-2.27 8.22 8.22 0 01-2.606.996 4.109 4.109 0 00-6.993 3.743A11.65 11.65 0 013.149 4.65a4.109 4.109 0 001.27 5.477 4.072 4.072 0 01-1.191-.33v.034a4.109 4.109 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.005c-.546 0-1.091-.033-1.625-.093A11.65 11.65 0 0010.329 21z" />
            </svg>
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
