import { configureStore } from '@reduxjs/toolkit'

// reducers
import error from '@/states/global/error'
import me from '@/states/global/me'
import settings from '@/states/global/settings'

export const store = configureStore({
  reducer: { error, me, settings },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
