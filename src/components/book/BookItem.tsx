import React from 'react';
import type { Book } from '../../types/types';
import { FaEdit, FaTrash, FaBook } from 'react-icons/fa';

interface BookItemProps {
  book: Book;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onBorrow: (id: string) => void;
  className?: string; // Add this prop for alternating row colors from BookList
}

const BookItem: React.FC<BookItemProps> = ({ book, onEdit, onDelete, onBorrow, className }) => {
  return (
    // Apply the className for alternating rows and enhanced hover effect
    <tr className={`border-b border-blue-100 last:border-b-0 ${className}`}> 
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-800"> {/* Stronger text color */}
        {book.title}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{book.author}</td> {/* Slightly darker text */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{book.genre}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{book.isbn}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{book.copies}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`
          px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full 
          ${book.available
            ? 'bg-green-200 text-green-900 border border-green-300' // More vibrant green for available
            : 'bg-red-200 text-red-900 border border-red-300' // More vibrant red for unavailable
          }
        `}>
          {book.available ? 'Available' : 'Unavailable'} {/* Changed 'Yes'/'No' to 'Available'/'Unavailable' for clarity */}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center space-x-3"> {/* Use flex for consistent spacing and alignment */}
          <button 
            onClick={() => onEdit(book._id)}
            className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out p-2 rounded-full hover:bg-blue-100" // Styled buttons
            title="Edit Book"
          >
            <FaEdit className="w-5 h-5" /> {/* Larger icons */}
          </button>
          <button 
            onClick={() => onDelete(book._id)}
            className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out p-2 rounded-full hover:bg-red-100"
            title="Delete Book"
          >
            <FaTrash className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onBorrow(book._id)}
            className={`
              text-green-500 hover:text-green-700 transition duration-300 ease-in-out p-2 rounded-full hover:bg-green-100
              ${book.copies === 0 ? 'opacity-40 cursor-not-allowed' : ''} 
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