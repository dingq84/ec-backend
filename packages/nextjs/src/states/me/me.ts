import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// constants
import SIDEBAR_MENU from '@/constants/components/sidebar'

// cores
import { IGetMeOutPort } from '@ec-backstage/core/src/auth/application/interface/iGetMeUseCase'

// types
import { SidebarMenuType } from '@/types/components/sidebar'

function filterAuthorizedSidebar(
  list: SidebarMenuType[],
  authorizedList: IGetMeOutPort['menu']
): SidebarMenuType[] {
  return list.reduce((accumulate: SidebarMenuType[], current) => {
    const authorizedTarget = authorizedList.find(item => item.id === current.id)

    // api menu 沒有該筆 menu
    if (authorizedTarget === undefined) {
      return accumulate
    }

    // 如果 ui menu 有子層，但和 api menu 比對後，沒有一個子層有權限，就不出添加進去
    const result = filterAuthorizedSidebar(current.children || [], authorizedTarget.children || [])
    if (current.children && result.length === 0) {
      return accumulate
    }

    // 如果比對結果有值，取代原本的 ui menu children
    if (result.length) {
      current.children = result
    }

    accumulate.push(current)
    return accumulate
  }, [])
}

interface initialState extends Pick<IGetMeOutPort, 'user' | 'role'> {
  menu: SidebarMenuType[]
}

const initialState: initialState = {
  menu: [],
  user: {} as initialState['user'],
  role: {} as initialState['role']
}

const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    clearMe: state => {
      state.menu = []
      state.user = {} as initialState['user']
      state.role = {} as initialState['role']
    },
    setMe: (state, action: PayloadAction<IGetMeOutPort>) => {
      const { user, menu, role } = action.payload
      state.role = role
      state.user = user
      state.menu = filterAuthorizedSidebar(SIDEBAR_MENU, menu)
    }
  }
})

export const { clearMe, setMe } = meSlice.actions

export default meSlice.reducer
