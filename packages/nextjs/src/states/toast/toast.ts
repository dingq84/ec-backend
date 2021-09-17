import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// components
import { Toast } from '@/components/shared/toast'

interface InitialState {
  toasts: Toast[]
}

const initialState: InitialState = {
  toasts: []
}

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    reset: state => {
      state.toasts = []
    },
    pushToast: (state, action: PayloadAction<Omit<Toast, 'id'>>) => {
      const id = new Date().getTime().toString()
      state.toasts = [...state.toasts, { ...action.payload, id }]
    },
    removeToast: (state, action: PayloadAction<{ id: string }>) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload.id)
    }
  }
})

export const { reset, pushToast, removeToast } = toastSlice.actions

export default toastSlice.reducer
