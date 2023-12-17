import { configureStore } from '@reduxjs/toolkit'
import { noteApi } from '../services/noteApi'
import { usersApi } from '../services/usersApi'

export const store = configureStore({
  reducer: {   
    [noteApi.reducerPath]: noteApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(noteApi.middleware, usersApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
