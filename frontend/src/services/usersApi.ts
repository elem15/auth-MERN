import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL, IMG_BASE_URL } from '../shared/constants'
import { getAge } from '../shared/getAge'

const convertUser = (user: UserFromApi) => {
  const { dateOfBirth } = user
  const age = getAge(new Date(), new Date(dateOfBirth))
  user.age = Math.trunc(age)
  user.img = user.img && `${IMG_BASE_URL}/api/users/images/${user.img}`
  return user
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Users', 'User'],
  endpoints: (builder) => ({
    getUsers: builder.query<UserFromApi[], void>({
      query: () => ({
        url: `api/users`,
        headers: {
          'Access-Control-Allow-Headers': "Accept, Content-Type, Authorization, X-Requested-With",
          'Access-Control-Allow-Origin': BASE_URL,          
        },
        crossDomain: true,
        xhrFields: { withCredentials: true },
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
        url: `api/users/one`,
        headers: {
          'Access-Control-Allow-Headers': "Accept, Content-Type, Authorization, X-Requested-With",
          'Access-Control-Allow-Origin': BASE_URL,
          
        },
        crossDomain: true,
        xhrFields: { withCredentials: true },
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
        url: `api/users/signup`,
        method: 'POST',
        body: body,
        headers: {
          'Access-Control-Allow-Headers': "Accept, Content-Type, Authorization, X-Requested-With",
          'Access-Control-Allow-Origin': BASE_URL,          
        },
        crossDomain: true,
        xhrFields: { withCredentials: true },
      }),
      invalidatesTags: ['Users', 'User'],
    }),
    updateUser: builder.mutation<UserFromApi, FormData>({
      query: (body) => ({
        url: `api/users/account`,
        method: 'PUT',
        body,
        headers: {
          'Access-Control-Allow-Headers': "Accept, Content-Type, Authorization, X-Requested-With",
          'Access-Control-Allow-Origin': BASE_URL,          
        },
        crossDomain: true,
        xhrFields: { withCredentials: true },
      }),
      invalidatesTags: ['User'],
    }),
    login: builder.mutation<UserFromApi, UserLogin>({
      query: (body) => ({
        url: `api/users/login`,
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': "Accept, Content-Type, Authorization, X-Requested-With",
          'Access-Control-Allow-Origin': BASE_URL,          
        },
        // crossDomain: true,
        // xhrFields: { withCredentials: true },
      }),
      invalidatesTags: ['Users', 'User'],
    }),
    logout: builder.mutation<unknown, void>({
      query: () => ({
        url: `api/users/logout`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': "Accept, Content-Type, Authorization, X-Requested-With",
          'Access-Control-Allow-Origin': BASE_URL,          
        },
        crossDomain: true,
        xhrFields: { withCredentials: true },
      }),
      invalidatesTags: ['Users', 'User'],
    }),
  })
})

export const { useGetUsersQuery, useSignUpMutation, useLoginMutation, useUpdateUserMutation, useGetUserQuery, useLogoutMutation } = usersApi
