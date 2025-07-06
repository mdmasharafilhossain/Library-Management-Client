import React, { useState } from 'react';


import BookList from '../components/book/BookList';
// import ConfirmationModal from '../components/ui/ConfirmationModal';

import { useDeleteBookMutation, useGetBooksQuery } from '../redux/api/bookApi';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const BookListPage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isError } = useGetBooksQuery({ page, limit });
  const books = data?.data || [];
  const meta = data?.meta;
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
 

  const handleNextPage = () => {
    if (meta && page < meta.totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
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
        <>
        <BookList 
          books={books} 
          onEdit={handleEdit} 
          onDelete={handleDeleteClick} 
          onBorrow={handleBorrow} 
        />
         <div className="mt-8 flex justify-center items-center space-x-2">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-blue-400 text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-lg font-semibold text-gray-700">
              Page {page} of {meta?.totalPages || 1}
            </span>
            <button
              onClick={handleNextPage}
              disabled={meta && page >= meta.totalPages}
              className="px-4 py-2 rounded-lg border border-blue-400 text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out"
            >
              Next
            </button>
          </div>
        </>
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