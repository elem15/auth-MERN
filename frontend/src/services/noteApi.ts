import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const BASE_URL = 'https://auth-mern-0pty.onrender.com'
const BASE_URL = 'http://localhost:5000'
export const noteApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Notes'],
  endpoints: (builder) => ({
    getNotes: builder.query<unknown, void>({
      query: () => `/app/notes`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetNotesQuery } = noteApi
