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
    <div className="overflow-x-auto rounded-xl shadow-xl border border-blue-100 mt-8 mb-8 mx-4 lg:mx-auto lg:max-w-8xl"> 
      <table className="min-w-full divide-y divide-blue-200">
        <thead className="bg-gradient-to-r from-blue-400 to-blue-500"> 
          <tr>
            <th className="px-6 py-4 text-left text-sm  font-bold text-white uppercase tracking-wider">Title</th> 
            <th className="px-6 py-4 text-left text-sm  font-bold text-white uppercase tracking-wider">Author</th>
            <th className="px-6 py-4 text-left text-sm  font-bold text-white uppercase tracking-wider">Genre</th>
            <th className="px-6 py-4 text-left text-sm  font-bold text-white uppercase tracking-wider">ISBN</th>
            <th className="px-6 py-4 text-left text-sm  font-bold text-white uppercase tracking-wider">Copies</th>
            <th className="px-6 py-4 text-left text-sm  font-bold text-white uppercase tracking-wider">Available</th>
            <th className="px-6 py-4 text-left text-sm  font-bold text-white uppercase tracking-wider">Actions</th>
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
              className={index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} // Alternating row colors
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;