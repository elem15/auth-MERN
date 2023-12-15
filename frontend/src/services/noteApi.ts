import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL, REMOTE_URL } from '../helpers/constants'

export const noteApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Notes'],
  endpoints: (builder) => ({
    getNotes: builder.query<Note[], void>({
      query: () => ({
        url: `/app/notes`
      }),    
      providesTags: ['Notes'],
    }),
    createNote: builder.mutation<Note, PostNote>({
      query: (body) => ({
        url: `/app/notes`,
        method: 'POST',
        credentials: 'include',
        body,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': "Accept, Content-Type, Authorization, X-Requested-With",
          'Access-Control-Allow-Origin': BASE_URL
        },
      }),
      invalidatesTags: ['Notes'],
    }),
  })
})

export const { useGetNotesQuery, useCreateNoteMutation } = noteApi
