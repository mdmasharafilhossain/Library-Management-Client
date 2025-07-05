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

    })
  }),
});

export const { useGetBooksQuery ,useAddBookMutation} = bookApi;
