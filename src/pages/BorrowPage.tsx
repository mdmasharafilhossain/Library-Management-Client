import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useGetBookByIdQuery } from '../redux/api/bookApi';
import { useBorrowBookMutation } from '../redux/api/borrowApi';
import Swal from 'sweetalert2';
import { format } from 'date-fns';

const BorrowPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookId } = useParams<{ bookId: string }>();
  const { data: book, isLoading, isError  } = useGetBookByIdQuery(bookId || '');
  const [borrowBook, { isLoading: isSubmitting, isSuccess, isError: borrowError, error }] = useBorrowBookMutation();
  
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState('');
  const [isDateValid, setIsDateValid] = useState(true);
  
  
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDueDate(format(tomorrow, 'yyyy-MM-dd'));
  }, []);

  // Handle success state
  useEffect(() => {
    if (isSuccess) {
      Swal.fire({
        title: 'Success!',
        html: `
          <div class="text-center">
            <svg class="w-16 h-16 text-green-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <h3 class="text-xl font-bold text-gray-800 mb-2">Book Borrowed Successfully!</h3>
            <p class="text-gray-600">
              You've borrowed <span class="font-semibold">${quantity}</span> 
              cop${quantity > 1 ? 'ies' : 'y'} of 
              <span class="font-semibold">${book?.title}</span>
            </p>
            <p class="text-gray-600 mt-2">
              Due date: <span class="font-semibold">${format(new Date(dueDate), 'MMM dd, yyyy')}</span>
            </p>
          </div>
        `,
        icon: 'success',
        confirmButtonColor: '#3b82f6',
        confirmButtonText: 'View Borrow Summary',
        showCancelButton: true,
        cancelButtonText: 'Borrow Another Book',
        timer: 5000,
        timerProgressBar: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/borrow-summary');
        } else {
          navigate('/books');
        }
      });
    }
  }, [isSuccess, book, quantity, dueDate, navigate]);

  // Handle error state
  useEffect(() => {
    if (borrowError) {
      let errorMessage = 'Failed to borrow book';
      
      if (error && 'data' in error) {
        const errorData = error.data as { message?: string; error?: string };
        errorMessage = errorData.message || errorData.error || errorMessage;
      }
      
      Swal.fire({
        title: 'Borrow Failed',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#3b82f6',
        confirmButtonText: 'Try Again',
      });
    }
  }, [borrowError, error]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = parseInt(e.target.value);
  if (!isNaN(value)) {
    setQuantity(value);
  }
};

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    setDueDate(e.target.value);
    setIsDateValid(selectedDate > today);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isDateValid) {
      Swal.fire({
        title: 'Invalid Date',
        text: 'Due date must be in the future',
        icon: 'warning',
        confirmButtonColor: '#3b82f6',
      });
      return;
    }
    
    if (!bookId) return;
    
    borrowBook({
  book: bookId,
  quantity,
  dueDate: new Date(dueDate).toISOString()
})
  .unwrap()
  .then(() => {
    setTimeout(() => {
      window.location.reload(); 
    }, 5000);
  })
  .catch((err) => {
    console.error("Borrow failed", err);
  });


    
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading book details...</p>
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-bold mb-2">Book Not Found</h2>
          <p className="mb-4">The book you're trying to borrow doesn't exist or may have been removed.</p>
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

  const maxQuantity = book.copies;
  const isAvailable = book.available && book.copies > 0;
console.log(book,"book");
  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Book Header */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-6 text-white">
            <div className="flex items-center">
              
              <div>
                <h1 className="text-3xl sm:text-3xl lg:text-4xl font-extrabold text-gray-100 tracking-tight pr-0 sm:pr-4 mb-4 sm:mb-0 text-center sm:text-left w-full sm:w-auto">
    Borrow Book
  </h1>
              
              </div>
            </div>
          </div>
          
          {/* Book Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start">
              
              
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
                <p className="text-gray-600">by {book.author}</p>
                
                <div className="mt-2 flex items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {isAvailable ? 'Available' : 'Not Available'}
                  </span>
                  <span className="ml-2 text-sm text-gray-600">
                    {book.copies} cop{book.copies !== 1 ? 'ies' : 'y'} available
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Borrow Form */}
          <div className="p-6">
            {!isAvailable ? (
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Not Available for Borrowing</h3>
                <p className="text-gray-600 mb-6">
                  This book is currently not available. Please check back later.
                </p>
                <button
                  onClick={() => navigate('/books')}
                  className="bg-blue-400 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded-md transition-colors"
                >
                  Browse Other Books
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Quantity Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    How many copies would you like to borrow?
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      disabled={quantity <= 1}
                      className="bg-blue-400  hover:bg-blue-500 text-black-500 text-xl rounded-l-lg px-4 py-2 disabled:opacity-50"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={maxQuantity}
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-full px-4 py-2 border-t border-b focus:ring-2 focus:ring-blue-400  hover:border-blue-400 border-gray-300 text-center"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(prev => Math.min(maxQuantity, prev + 1))}
                      disabled={quantity >= maxQuantity}
                      className="bg-blue-400  hover:bg-blue-500 text-black-500 text-xl rounded-r-lg px-4 py-2 disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Maximum: {maxQuantity} cop{maxQuantity !== 1 ? 'ies' : 'y'}
                  </p>
                </div>
                
                {/* Due Date Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={handleDateChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      !isDateValid ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent`}
                  />
                  {!isDateValid && (
                    <p className="mt-1 text-sm text-red-600">Due date must be in the future</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Select the date by which you'll return the book
                  </p>
                </div>
                
                {/* Summary */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <h3 className="font-medium text-blue-800 mb-2">Borrowing Summary</h3>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Book:</span>
                    <span className="font-medium">{book.title}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">Copies:</span>
                    <span className="font-medium">{quantity}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">Due Date:</span>
                    <span className="font-medium">
                      {dueDate ? format(new Date(dueDate), 'MMM dd, yyyy') : 'Not set'}
                    </span>
                  </div>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-400 hover:bg-blue-500 text-white font-medium py-3 px-4 rounded-lg shadow-md transition-colors duration-300 flex items-center justify-center disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Borrow Request...
                    </>
                  ) : (
                    'Confirm Borrow'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="mt-6 text-center">
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

export default BorrowPage;