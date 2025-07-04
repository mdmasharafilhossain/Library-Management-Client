import React, { useState } from 'react';


import BookList from '../components/book/BookList';
// import ConfirmationModal from '../components/ui/ConfirmationModal';

import { useGetBooksQuery } from '../redux/api/bookApi';
import { useNavigate } from 'react-router';

const BookListPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: books = [], isLoading, isError, refetch } = useGetBooksQuery();
//   const [deleteBook] = useDeleteBookMutation();
  const [showModal, setShowModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    navigate(`/edit-book/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedBookId(id);
    setShowModal(true);
  };

  const handleBorrow = (id: string) => {
    navigate(`/borrow/${id}`);
  };

//   const confirmDelete = async () => {
//     if (selectedBookId) {
//       try {
//         await deleteBook(selectedBookId).unwrap();
//         toast.success('Book deleted successfully');
//         refetch();
//       } catch (error) {
//         toast.error('Failed to delete book');
//       } finally {
//         setShowModal(false);
//       }
//     }
//   };

  if (isLoading) return <div className="text-center py-8">Loading books...</div>;
  if (isError) return <div className="text-center py-8 text-red-500">Error loading books</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Library Books</h1>
        <button
          onClick={() => navigate('/add-book')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add New Book
        </button>
      </div>

      {books && books.length > 0 ? (
        <BookList 
          books={books} 
          onEdit={handleEdit} 
          onDelete={handleDeleteClick} 
          onBorrow={handleBorrow} 
        />
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No books found in the library</p>
          <button
            onClick={() => navigate('/add-book')}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Your First Book
          </button>
        </div>
      )}

      {/* <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this book? This action cannot be undone."
      /> */}
    </div>
  );
};

export default BookListPage;