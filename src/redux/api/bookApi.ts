import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book } from '../../types/types';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  tagTypes: ['Book'],

  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query: () => '/books',

      
      transformResponse: (response: { data: Book[] }) => response.data,

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Book' as const, id: _id })),
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





  }),

  
});

export const { useGetBooksQuery ,
  useAddBookMutation , 
  useGetBookByIdQuery , 
  useUpdateBookMutation
  
}= bookApi;
