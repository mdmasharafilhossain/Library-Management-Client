import React from 'react';
import { useForm } from 'react-hook-form';
import type { BookFormData, Genre } from '../../types/types';


const genres: Genre[] = ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'];

interface BookFormProps {
  initialData?: BookFormData;
  onSubmit: (data: BookFormData) => void;
  isSubmitting: boolean;
}

const BookForm: React.FC<BookFormProps> = ({ 
  initialData, 
  onSubmit, 
  isSubmitting 
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<BookFormData>({
    defaultValues: initialData || {
      copies: 1,
      available: true
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
          {initialData ? 'Edit Book Details' : 'Add New Book'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              {...register('title', { required: 'Title is required' })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent`}
              placeholder="Enter book title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author *
            </label>
            <input
              {...register('author', { required: 'Author is required' })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.author ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent`}
              placeholder="Enter author name"
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-600">{errors.author.message}</p>
            )}
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Genre *
            </label>
            <select
              {...register('genre', { required: 'Genre is required' })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.genre ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent`}
            >
              <option value="">Select a genre</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            {errors.genre && (
              <p className="mt-1 text-sm text-red-600">{errors.genre.message}</p>
            )}
          </div>

          {/* ISBN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ISBN *
            </label>
            <input
              {...register('isbn', { required: 'ISBN is required' })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.isbn ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent`}
              placeholder="Enter ISBN number"
            />
            {errors.isbn && (
              <p className="mt-1 text-sm text-red-600">{errors.isbn.message}</p>
            )}
          </div>

          {/* Copies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Copies *
            </label>
            <input
              type="number"
              {...register('copies', { 
                required: 'Copies is required',
                min: { value: 0, message: 'Copies must be at least 0' },
                valueAsNumber: true
              })}
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.copies ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent`}
              placeholder="Number of copies"
            />
            {errors.copies && (
              <p className="mt-1 text-sm text-red-600">{errors.copies.message}</p>
            )}
          </div>

          {/* Availability */}
          <div className="flex items-center pt-4">
            <input
              id="available"
              type="checkbox"
              {...register('available')}
              className="h-4 w-4 text-blue-400 rounded border-gray-300 focus:ring-blue-400"
            />
            <label htmlFor="available" className="ml-2 block text-sm text-gray-700">
              Available for borrowing
            </label>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className={`w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent`}
            placeholder="Enter book description"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              initialData ? 'Update Book' : 'Add Book'
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default BookForm;