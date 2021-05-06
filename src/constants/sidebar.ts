/**
 * @author Dean Chen 2021-04-12
 * BASIC_SIDEBAR_MENU 提供使用者自定義 sidebar，至於 sidebar 畫面的邏輯，會透過 utils/sidebar 去做處理
 * TODO: 根據未來專案需求，可能會有權限設定
 */

import { faTachometerAlt, faCog, faUserCog, faUserTie } from '@fortawesome/free-solid-svg-icons'

// types
import { BASIC_SIDEBAR_MENU_TYPE } from '@/types/sidebar'

const BASIC_SIDEBAR_MENU: Array<BASIC_SIDEBAR_MENU_TYPE> = [
  {
    icon: faCog,
    name: '系統管理',
    children: [
      {
        icon: faUserCog,
        name: '帳號管理',
        href: '/system/user'
      },
      {
        icon: faUserTie,
        name: '角色管理',
        href: '/system/user'
      }
    ]
  },
  {
    icon: faTachometerAlt,
    name: 'About'
  }
]

export { BASIC_SIDEBAR_MENU }
