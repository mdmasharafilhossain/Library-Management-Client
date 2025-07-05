import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetBookByIdQuery, useUpdateBookMutation } from '../redux/api/bookApi';
import type { BookFormData } from '../types/types';
import BookForm from '../components/book/BookForm';
import Swal from 'sweetalert2';

const EditBookPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading: isBookLoading, isError: isBookError } = useGetBookByIdQuery(id || '');
  const [updateBook, { isLoading: isUpdating, isSuccess, isError, error }] = useUpdateBookMutation();

  // Handle success state
  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: 'Success!',
        text: 'Book updated successfully!',
        icon: 'success',
        confirmButtonColor: '#3b82f6',
        confirmButtonText: 'Go to Books',
        showCancelButton: true,
        cancelButtonText: 'Continue Editing',
        timer: 3000,
        timerProgressBar: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/books');
        } else if (result.dismiss === Swal.DismissReason.timer) {
          navigate('/books');
        }
      });
    }
  }, [isSuccess, navigate]);

  // Handle error state
  useEffect(() => {
    if (isError) {
      let errorMessage = 'Failed to update book';
      
      if (error && 'data' in error) {
        const errorData = error.data as { message?: string; error?: string };
        errorMessage = errorData.message || errorData.error || errorMessage;
      }
      
      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#3b82f6',
        confirmButtonText: 'Try Again',
      });
    }
  }, [isError, error]);

  const handleSubmit = async (bookData: BookFormData) => {
    if (!id) return;
    
    try {
      await updateBook({ id, updates: bookData }).unwrap();
    } catch (err) {
     console.error(err)
    }
  };

  if (isBookLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading book details...</p>
      </div>
    );
  }

  if (isBookError || !book) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-bold mb-2">Book Not Found</h2>
          <p className="mb-4">The book you're trying to edit doesn't exist or may have been removed.</p>
          <button
            onClick={() => navigate('/books')}
            className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Edit Book</h1>
              <p className="text-gray-600">Update the details of "{book.title}"</p>
            </div>
          </div>
          
          <BookForm 
            initialData={book}
            onSubmit={handleSubmit} 
            isSubmitting={isUpdating} 
          />
        </div>
        
        <div className="text-center">
          <button
            onClick={() => navigate('/books')}
            className="text-blue-500 hover:text-blue-700 font-medium inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Books List
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookPage;