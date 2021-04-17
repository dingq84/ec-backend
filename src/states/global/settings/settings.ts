import { createSlice } from '@reduxjs/toolkit'

type initialStateProps = {
  sidebarIsExtend: boolean
}

const initialState: initialStateProps = {
  sidebarIsExtend: true
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleSidebar: state => {
      state.sidebarIsExtend = !state.sidebarIsExtend
    }
  }
})

export const { toggleSidebar } = settingsSlice.actions

export default settingsSlice.reducer
