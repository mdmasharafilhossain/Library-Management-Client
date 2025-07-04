import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book } from '../../types/types';

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    tagTypes: ['Book'],
    endpoints: (builder) => ({
        getBooks: builder.query<Book[], void>({
            query: () => '/books',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Book' as const, id: _id })),
                        { type: 'Book', id: 'LIST' },
                    ]
                    : [{ type: 'Book', id: 'LIST' }],
        })

    })
});





export const {

    useGetBooksQuery

} =bookApi
