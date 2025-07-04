import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Borrow, BorrowSummary } from '../../types/types';


export const borrowApi = createApi({
  reducerPath: 'borrowApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Borrow'],
  endpoints: (builder) => ({
    borrowBook: builder.mutation<Borrow, Partial<Borrow>>({
      query: (borrowData) => ({
        url: '/borrow',
        method: 'POST',
        body: borrowData,
      }),
      invalidatesTags: ['Borrow'],
    }),
    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => '/borrow-summary',
      providesTags: ['Borrow'],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;