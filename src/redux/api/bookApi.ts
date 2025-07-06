import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book } from '../../types/types';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  tagTypes: ['Book'],

  endpoints: (builder) => ({
    getBooks: builder.query<
  { data: Book[]; meta: { page: number; limit: number; total: number; totalPages: number } },
  { page?: number; limit?: number; filter?: string; sortBy?: string; sort?: 'asc' | 'desc' }
>({
  query: ({ page = 1, limit = 10, filter, sortBy = 'createdAt', sort = 'asc' }) => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('limit', limit.toString());
    params.set('sortBy', sortBy);
    params.set('sort', sort);
    if (filter) params.set('filter', filter);

    return `/books?${params.toString()}`;
  },

  
  transformResponse: (response: {
    data: { data: Book[]; meta: { page: number; limit: number; total: number; totalPages: number } };
  }) => response.data,

  providesTags: (result) =>
    result?.data
      ? [
          ...result.data.map(({ _id }) => ({ type: 'Book' as const, id: _id })),
          { type: 'Book', id: 'LIST' },
        ]
      : [{ type: 'Book', id: 'LIST' }],
}),

    // For Add n New Book
    addBook: builder.mutation<Book, Partial<Book>>({
      query:(book)=>({
        url:'/books',
        method:'POST',
        body:book
      }),
        invalidatesTags: [{ type: 'Book', id: 'LIST' }],

    }),

    // Get a Book by ID
getBookById: builder.query<Book, string>({
  query: (id) => `/books/${id}`,
  transformResponse: (response: { data: Book }) => response.data,
  providesTags: (result, error, id) => [{ type: 'Book', id }],
}),

// For Updating the book
updateBook: builder.mutation<Book, { id: string; updates: Partial<Book> }>({
  query: ({ id, updates }) => ({
    url: `/books/${id}`,
    method: 'PUT',
    body: updates,
  }),
  invalidatesTags: (result, error, { id }) => [{ type: 'Book', id }],
}),
 deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Book', id }],
    }),
 




  }),

  
});

export const { useGetBooksQuery ,
  useAddBookMutation , 
  useGetBookByIdQuery , 
  useUpdateBookMutation,
  useDeleteBookMutation

}= bookApi;
