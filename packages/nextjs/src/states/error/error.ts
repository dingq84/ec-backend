import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// core
import { StatusCode } from '@ec-backstage/core/src/common/constants/statusCode'

interface InitialState {
  show: boolean
  message: string
  statusCode: StatusCode
  callback?: () => void
}

const initialState: InitialState = {
  show: false,
  message: '',
  statusCode: null!
}

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    reset: state => {
      state.show = false
      state.message = ''
      state.callback = undefined
    },
    setError: (state, action: PayloadAction<InitialState>) => {
      const { show, message, callback, statusCode } = action.payload
      state.show = show
      state.message = message.replace(/,/g, ',\n')
      state.callback = callback
      state.statusCode = statusCode
    },
    hideError: state => {
      state.show = false
    },
    showError: state => {
      state.show = true
    }
  }
})

export const { setError, reset, hideError, showError } = errorSlice.actions

export default errorSlice.reducer
