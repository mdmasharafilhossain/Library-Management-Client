import React from 'react';


import BookList from '../components/book/BookList';
// import ConfirmationModal from '../components/ui/ConfirmationModal';

import { useDeleteBookMutation, useGetBooksQuery } from '../redux/api/bookApi';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const BookListPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: books = [], isLoading, isError } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
 

  const handleEdit = (id: string) => {
    navigate(`/edit-book/${id}`);
  };

  const handleDeleteClick = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this book?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    try {
      await deleteBook(id).unwrap();
      await Swal.fire('Deleted!', 'Book has been deleted.', 'success');
    } catch (err) {
      await Swal.fire('Failed!', 'Failed to delete the book.', 'error');
      console.error(err)
    }
  }
  const handleBorrow = (id: string) => {
    navigate(`/borrow/${id}`);
  };



  if (isLoading) return ( <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading book data...</p>
      </div>);
  if (isError) return <div className="text-center py-8 text-red-500">Error loading books</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 px-4 sm:px-6 lg:px-2">
  <h1 className="text-3xl sm:text-3xl lg:text-4xl font-extrabold text-blue-500 tracking-tight pr-0 sm:pr-4 mb-4 sm:mb-0 text-center sm:text-left w-full sm:w-auto">
    All Library Books
  </h1>
  <button
    onClick={() => navigate('/add-book')}
    className="bg-blue-500 text-white px-4 py-2 font-bold rounded-md hover:bg-blue-600 w-full sm:w-auto text-center"
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

      
    </div>
  );
};

export default BookListPage;