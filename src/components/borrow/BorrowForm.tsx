import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Book } from '../../types/types';
import { useGetBookByIdQuery } from '../../store/api/bookSlice';
import { useBorrowBookMutation } from '../../store/api/borrowSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface BorrowFormProps {
  bookId: string;
}

const BorrowForm: React.FC<BorrowFormProps> = ({ bookId }) => {
  const navigate = useNavigate();
  const [maxQuantity, setMaxQuantity] = useState(0);
  const { data: book, isLoading, isError } = useGetBookByIdQuery(bookId);
  const [borrowBook, { isLoading: isSubmitting }] = useBorrowBookMutation();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const quantity = watch('quantity', 1);

  useEffect(() => {
    if (book) {
      setMaxQuantity(book.copies);
    }
  }, [book]);

  const onSubmit = async (data: any) => {
    try {
      await borrowBook({
        book: bookId,
        quantity: Number(data.quantity),
        dueDate: data.dueDate
      }).unwrap();
      
      toast.success('Book borrowed successfully!');
      navigate('/borrow-summary');
    } catch (error) {
      toast.error('Failed to borrow book');
    }
  };

  if (isLoading) return <div>Loading book details...</div>;
  if (isError || !book) return <div>Error loading book details</div>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Borrow: {book.title}</h2>
      <p className="mb-4">Available copies: {book.copies}</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity *</label>
          <input
            type="number"
            min="1"
            max={maxQuantity}
            {...register('quantity', { 
              required: 'Quantity is required',
              min: { value: 1, message: 'Must borrow at least 1 copy' },
              max: { value: maxQuantity, message: `Cannot borrow more than ${maxQuantity} copies` }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.quantity && (
            <p className="mt-1 text-sm text-red-600">{errors.quantity.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Due Date *</label>
          <input
            type="date"
            {...register('dueDate', { 
              required: 'Due date is required',
              validate: value => {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return selectedDate > today || 'Due date must be in the future';
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.dueDate && (
            <p className="mt-1 text-sm text-red-600">{errors.dueDate.message as string}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Processing...' : 'Borrow Book'}
        </button>
      </form>
    </div>
  );
};

export default BorrowForm;