import React from 'react';
import type { Book } from '../../types/types';
import { FaEdit, FaTrash, FaBook } from 'react-icons/fa';

interface BookItemProps {
  book: Book;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onBorrow: (id: string) => void;
  className?: string; 
}

const BookItem: React.FC<BookItemProps> = ({ book, onEdit, onDelete, onBorrow, className }) => {
  return (
    
    <tr className={`border-b border-blue-100 last:border-b-0 hover:bg-blue-100 transition duration-150 ease-in-out ${className}`}>
      <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-blue-800"> 
        {book.title}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">{book.author}</td>
      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">{book.genre}</td>
      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">{book.isbn}</td>
      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">{book.copies}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`
          px-3 py-1 inline-flex text-sm leading-5 font-bold rounded-full
          ${book.available 
            ? 'bg-green-200 text-green-900 border border-green-300' 
            : 'bg-red-200 text-red-900 border border-red-300' 
          }
        `}>
          {book.available  ? 'Available' : 'Unavailable'} 
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center space-x-3"> 
          <button
            onClick={() => onEdit(book._id)}
            className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out p-2 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" 
            title="Edit Book"
          >
            <FaEdit className="w-5 h-5" /> 
          </button>
          <button
            onClick={() => onDelete(book._id)}
            className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out p-2 rounded-full hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            title="Delete Book"
          >
            <FaTrash className="w-5 h-5" />
          </button>
          <button
            onClick={() => onBorrow(book._id)}
            className={`
              text-green-500 hover:text-green-700 transition duration-300 ease-in-out p-2 rounded-full hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
              ${book.copies === 0 ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            title={book.copies === 0 ? "No copies available" : "Borrow Book"}
            disabled={book.copies === 0}
          >
            <FaBook className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BookItem;