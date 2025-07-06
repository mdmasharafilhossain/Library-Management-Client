import React, { useState } from 'react';
import BookList from '../components/book/BookList';
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

  if (isLoading) return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading book data...</p>
    </div>
  );

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
          {/* --- Pagination --- */}
          <div className="mt-8 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={handlePreviousPage}
                disabled={page === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Previous</span>
                {/* Heroicon name: solid/chevron-left */}
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Page numbers would go here if you wanted individual page buttons */}
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                Page {page} of {meta?.totalPages || 1}
              </span>

              <button
                onClick={handleNextPage}
                disabled={meta && page >= meta.totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="sr-only">Next</span>
                {/* Heroicon name: solid/chevron-right */}
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
          {/* --- End Pagination --- */}
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