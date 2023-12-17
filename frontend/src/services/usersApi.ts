import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../helpers/constants'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<UserFromApi[], void>({
      query: () => ({
        url: `app/users`
      }),    
      providesTags: ['Users'],
    }),
    signUp: builder.mutation<UserFromApi, User>({
      query: (body) => ({
        url: `app/users/signup`,
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': "Accept, Content-Type, Authorization, X-Requested-With",
          'Access-Control-Allow-Origin': BASE_URL
        },
      }),
      invalidatesTags: ['Users'],
    }),
  })
})

export const { useGetUsersQuery, useSignUpMutation} = usersApi
