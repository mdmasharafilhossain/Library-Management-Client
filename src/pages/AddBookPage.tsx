import React from 'react';
import { useNavigate } from 'react-router';
import { useAddBookMutation } from '../redux/api/bookApi';
import type { BookFormData } from '../types/types';
import BookForm from '../components/book/BookForm';
import Swal from 'sweetalert2';






const AddBookPage: React.FC = () => {
  const navigate = useNavigate();
  const [addBook, { isLoading }] = useAddBookMutation();
  

  const handleSubmit = async (bookData: BookFormData) => {
    try {
      await addBook(bookData).unwrap();
      Swal.fire({
    title:'Book Added',
    text:'Book Added Successfully',
    icon: 'success',
    confirmButtonColor: '#3b82f6',
    timer: 3000,
    timerProgressBar: true,
  });
      navigate('/books');
    } catch (error) {
     Swal.fire({
    title:'Failed To Added Book',
    text:'Failed To Added Book',
    icon: 'error',
    confirmButtonColor: '#3b82f6',
  });
      console.error('Failed to add book:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-3xl lg:text-4xl font-extrabold text-blue-500 tracking-tight pr-0 sm:pr-4 mb-4 sm:mb-0 text-center sm:text-left w-full sm:w-auto">
    Add a New Book
  </h1>
      <BookForm 
        onSubmit={handleSubmit} 
        isSubmitting={isLoading} 
      />
    </div>
  );
};

export default AddBookPage;