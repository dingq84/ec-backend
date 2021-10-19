import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
  sidebarIsExtend: boolean
}

const initialState: InitialState = {
  sidebarIsExtend: true
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSidebar: (state, action: PayloadAction<boolean>) => {
      state.sidebarIsExtend = action.payload
    },
    toggleSidebar: state => {
      state.sidebarIsExtend = !state.sidebarIsExtend
    }
  }
})

export const { toggleSidebar, setSidebar } = settingsSlice.actions

export default settingsSlice.reducer
