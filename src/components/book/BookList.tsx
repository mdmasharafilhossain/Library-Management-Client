import React from 'react';
import type { Book } from '../../types/types';
import BookItem from './BookItem';

interface BookListProps {
  books: Book[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onBorrow: (id: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete, onBorrow }) => {
  return (
    <div className="overflow-hidden shadow-xl rounded-xl border border-blue-100 mx-auto "> {/* More pronounced shadow, rounded borders, and max-width */}
      <table className="min-w-full divide-y divide-blue-200">
        <thead className="bg-gradient-to-r from-blue-600 to-blue-700"> {/* Gradient background for header */}
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Title</th> {/* Slightly larger padding, semibold font */}
            <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Author</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Genre</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">ISBN</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Copies</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Available</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-blue-100">
          {books.map((book, index) => (
            <BookItem
              key={book._id}
              book={book}
              onEdit={onEdit}
              onDelete={onDelete}
              onBorrow={onBorrow}
             
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;