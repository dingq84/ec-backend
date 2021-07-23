import { configureStore } from '@reduxjs/toolkit'

// reducers
import settings from './settings'

export const store = configureStore({
  reducer: { settings }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
