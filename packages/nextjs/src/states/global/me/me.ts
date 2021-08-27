import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// constants
import SIDEBAR_MENU from '@/constants/components/sidebar'

// cores
import { IMeDTO } from '@ec-backstage/core/src/auth/domains/dto/MeDTO'

// types
import { SidebarMenuType } from '@/types/components/sidebar'

interface initialState {
  menu: SidebarMenuType[]
  user: IMeDTO['user']
}

const initialState: initialState = {
  menu: [],
  user: {} as initialState['user']
}

// function flatAuthorizedId(list: IMeDTO['menu']): number[] {
//   return list.reduce((accumulate, current) => {
//     accumulate.push(current.id)

//     if (current.children) {
//       const children = flatAuthorizedId(current.children)
//       accumulate.push(...children)
//     }

//     return accumulate
//   }, [] as number[])
// }

// function filterUnAuthorizedSidebar(list: SidebarMenuType[], authorizedList: number[]) {
//   return list.filter(item => {
//     if (!authorizedList.includes(item.id)) {
//       return false
//     }

//     if (item.children) {
//       item.children = filterUnAuthorizedSidebar(item.children, authorizedList)
//     }

//     return true
//   })
// }

const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    clearMe: state => {
      state.menu = []
      state.user = {} as initialState['user']
    },
    setMe: (state, action: PayloadAction<IMeDTO>) => {
      const { user } = action.payload
      // const flatIdList = flatAuthorizedId(menu)

      state.user = user
      state.menu = SIDEBAR_MENU
    }
  }
})

export const { clearMe, setMe } = meSlice.actions

export default meSlice.reducer
