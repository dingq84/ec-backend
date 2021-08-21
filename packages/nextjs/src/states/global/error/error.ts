import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  message: string
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
    setMessage: (state, action: PayloadAction<{ message: string }>) => {
      state.message = action.payload.message
    }
  }
})

export const { setMessage, reset } = errorSlice.actions

export default errorSlice.reducer
