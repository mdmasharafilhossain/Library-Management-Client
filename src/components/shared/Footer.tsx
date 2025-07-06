// This assumes you are in a .jsx or .tsx file
// If you are using TypeScript, you might want to add React.FC type:
import React from 'react'; // Make sure React is imported for a TSX file

const Footer: React.FC = () => { // Added React.FC type for better TypeScript practice
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8 mt-16 rounded-t-xl shadow-inner">
    {/* If you want a blue footer, change bg-gray-900 to e.g., bg-blue-900 or bg-indigo-900 */}
    {/* Example: <footer className="bg-blue-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8 mt-16 rounded-t-xl shadow-inner"> */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">

        {/* Column 1: Brand Info */}
        <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center mb-4">
            {/* Placeholder for your logo. Replace with your actual logo SVG or image */}
            <svg className="w-10 h-10 text-blue-400 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.31L18.6 7 12 10.69 5.4 7 12 4.31zM4 8.46l7 3.5v7.08l-7-3.5V8.46zm8 11.08l-7-3.5V10.54l7 3.5v7.08zm8-11.08l-7-3.5V10.54l7 3.5v7.08z"/>
            </svg>
            <span className="text-3xl font-extrabold text-white">BookStation</span>
          </div>
          <p className="text-sm leading-relaxed max-w-md">
            Your ultimate destination for managing and discovering books. Explore, borrow, and keep track of your literary journey with ease.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-semibold text-white mb-4 border-b-2 border-blue-600 pb-1">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 ease-in-out">All Books</a></li>
            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 ease-in-out">Add Book</a></li>
            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 ease-in-out">Borrow Summary</a></li>
            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 ease-in-out">About Us</a></li>
          </ul>
        </div>

        {/* Column 3: Resources & Contact */}
        <div className="col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-semibold text-white mb-4 border-b-2 border-blue-600 pb-1">Contact</h3>
          <ul className="space-y-2">
            <li><a href="mailto:info@bookstation.com" className="text-gray-400 hover:text-blue-400 transition duration-300 ease-in-out">info@bookstation.com</a></li>
            <li><a href="tel:+1234567890" className="text-gray-400 hover:text-blue-400 transition duration-300 ease-in-out">+1 (234) 567-890</a></li>
            <li><span className="text-gray-400">123 Library Lane, Bookville, Fictionland</span></li>
          </ul>
          <h3 className="text-lg font-semibold text-white mt-6 mb-4 border-b-2 border-blue-600 pb-1">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 ease-in-out">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 ease-in-out">Terms of Service</a></li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <hr className="border-gray-700 my-10 max-w-7xl mx-auto" />

      {/* Bottom Section: Social Media & Copyright */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <p className="text-sm text-gray-500 mb-4 sm:mb-0">
          &copy; 2025 BookStation. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-110">
            {/* Facebook Icon (replace with actual SVG or Font Awesome if available) */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-110">
            {/* Twitter Icon */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.007-.532A8.318 8.318 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.11 4.11 0 001.804-2.27 8.22 8.22 0 01-2.606.996 4.109 4.109 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.109 4.109 0 001.27 5.477A4.072 4.072 0 014 9.659v.052a4.109 4.109 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.005c-.546 0-1.091-.033-1.625-.093a11.65 11.65 0 0010.329 3.33z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-110">
            {/* Instagram Icon */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 0C8.74 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.636 3.375.939 2.671 1.455 2.071 2.055 1.47.055 0.954 2.055 0.651 2.82.349 3.585.148 4.455.088 5.733.03 7.01.014 7.42 0 10.75c0 3.33 0 3.714.014 4.993.058 1.278.259 2.149.562 2.914.303.765.819 1.46 1.42 2.06.601.601 1.302 1.116 2.067 1.419.766.302 1.636.503 2.914.562 1.279.058 1.69.072 4.993.072 3.33 0 3.714-.014 4.993-.072 1.278-.058 2.149-.259 2.914-.562.765-.303 1.46-.819 2.06-1.42.601-.601 1.116-1.302 1.419-2.067.302-.766.503-1.636.562-2.914.058-1.279.072-1.69.072-4.993 0-3.33 0-3.714-.014-4.993-.058-1.278-.259-2.149-.562-2.914-.303-.765-.819-1.46-1.42-2.06-.601-.601-1.302-1.116-2.067-1.419-.766-.302-1.636-.503-2.914-.562C15.71 0.014 15.333 0 12 0zm0 2.16c3.2 0 3.585.016 4.85.071 1.17.055 1.8.249 2.22.415.54.213.925.529 1.34.944.415.415.73.8.943 1.34.166.42.36 1.05.413 2.22.057 1.265.07 1.65.07 4.85s-.014 3.585-.07 4.85c-.053 1.17-.247 1.8-.413 2.22-.213.54-.529.925-.943 1.34-.415.415-.8.73-1.34.943-.42.166-1.05.36-2.22.413-1.265.057-1.65.07-4.85.07s-3.585-.014-4.85-.07c-1.17-.053-1.8-.247-2.22-.413-.54-.213-.925-.529-1.34-.943-.415-.415-.8-.73-.943-1.34-.166-.42-.36-1.05-.413-2.22-.057-1.265-.07-1.65-.07-4.85s.014-3.585.07-4.85c.053-1.17.247-1.8.413-2.22.213-.54.529-.925.943-1.34.415-.415.8-.73 1.34-.943.42-.166 1.05-.36 2.22-.413C8.415 2.176 8.79 2.16 12 2.16zm0 3.635a6.205 6.205 0 100 12.41 6.205 6.205 0 000-12.41zm0 2.16a4.045 4.045 0 110 8.09 4.045 4.045 0 010-8.09zm0 1.47a2.575 2.575 0 100 5.15 2.575 2.575 0 000-5.15zM20.21 3.92a1.14 1.14 0 11-2.28 0 1.14 1.14 0 012.28 0z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-110">
            {/* LinkedIn Icon */}
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M0 1.146C0 .513.526 0 1.176 0h13.652c.65 0 1.176.513 1.176 1.146v13.652c0 .633-.526 1.146-1.176 1.146H1.176C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542V13.394h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.867 0 1.213.66 1.213 1.639v3.424h2.401V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.867 0 1.213.66 1.213 1.639v3.424h2.401V9.484c0-2.485-1.12-3.869-3.521-3.869-1.81 0-2.472 1.04-2.82 1.624h.016v-1.17H9.109v7.277h2.401z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; // Correct export statement