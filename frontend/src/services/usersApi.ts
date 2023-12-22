import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../helpers/constants'
import { getAge } from '../helpers/getAge'

const convertUser = (user: UserFromApi) => {
  const { dateOfBirth } = user
  const age = getAge(new Date(), new Date(dateOfBirth))
  user.age = Math.trunc(age)
  user.img = user.img && `${BASE_URL}/app/users/images/${user.img}`
  return user
}
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Users', 'User'],
  endpoints: (builder) => ({
    getUsers: builder.query<UserFromApi[], void>({
      query: () => ({
        url: `app/users`
      }),    
      providesTags: ['Users'],
      transformResponse: async (
        value: UserFromApi[] | Promise<UserFromApi[]>,  
      ) => {
        const users = await value
        return users.map(convertUser)
      },
    }),
    getUser: builder.query<UserFromApi, void>({
      query: () => ({
        url: `app/users/one`
      }),    
      providesTags: ['User'], 
      transformResponse: async (
        value: UserFromApi | Promise<UserFromApi>,  
      ) => {
        const user = await value
        return convertUser(user)
      },
    }),
    signUp: builder.mutation<UserFromApi, FormData>({
      query: (body) => ({
        url: `app/users/signup`,
        method: 'POST',
        body: body,
        headers: {
          'Access-Control-Allow-Headers': "Accept, Content-Type, Authorization, X-Requested-With",
          'Access-Control-Allow-Origin': BASE_URL
        },
      }),
      invalidatesTags: ['Users', 'User'],
    }),
    updateUser: builder.mutation<UserFromApi, FormData>({
      query: (body) => ({
        url: `app/users/account`,
        method: 'PUT',
        body,
        headers: {
          'Access-Control-Allow-Headers': "Accept, Content-Type, Authorization, X-Requested-With",
          'Access-Control-Allow-Origin': BASE_URL
        },
      }),
      invalidatesTags: ['User'],
    }),
    login: builder.mutation<UserFromApi, UserLogin>({
      query: (body) => ({
        url: `app/users/login`,
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': "Accept, Content-Type, Authorization, X-Requested-With",
          'Access-Control-Allow-Origin': BASE_URL
        },
      }),
      invalidatesTags: ['Users', 'User'],
    }),
    logout: builder.mutation<unknown, void>({
      query: () => ({
        url: `app/users/logout`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': "Accept, Content-Type, Authorization, X-Requested-With",
          'Access-Control-Allow-Origin': BASE_URL
        },
      }),
      invalidatesTags: ['Users', 'User'],
    }),
  })
})

export const { useGetUsersQuery, useSignUpMutation, useLoginMutation, useUpdateUserMutation, useGetUserQuery, useLogoutMutation } = usersApi
