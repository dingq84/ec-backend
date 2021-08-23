import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  message: string
  callback?: () => void
}

const initialState: InitialState = {
  message: ''
}

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    reset: state => {
      state.message = ''
    },
    setError: (state, action: PayloadAction<{ message: string; callback?: () => void }>) => {
      const { message, callback } = action.payload
      state.message = message
      state.callback = callback
    }
  }
})

export const { setError, reset } = errorSlice.actions

export default errorSlice.reducer
