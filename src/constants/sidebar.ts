/**
 * @author Dean Chen 2021-04-12
 * BASIC_SIDEBAR_MENU 提供使用者自定義 sidebar，至於 sidebar 畫面的邏輯，會透過 utils/sidebar 去做處理
 * TODO: 根據未來專案需求，可能會有權限設定
 */

import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons'

// types
import { BASIC_SIDEBAR_MENU_TYPE } from '@/types/sidebar'

const BASIC_SIDEBAR_MENU: Array<BASIC_SIDEBAR_MENU_TYPE> = [
  {
    icon: faTachometerAlt,
    name: 'Dashboard',
    children: [
      {
        icon: faTachometerAlt,
        name: 'Dashboard v1',
        children: [
          {
            icon: faTachometerAlt,
            name: 'Dashboard v1 v1',
            children: [
              {
                icon: faTachometerAlt,
                name: 'Dashboard v1 v1 v1',
                href: '/test'
              },
              {
                icon: faTachometerAlt,
                name: 'Dashboard v1 v1 v2',
                href: '/'
              }
            ]
          },
          {
            icon: faTachometerAlt,
            name: 'Dashboard v1 v2',
            href: '/'
          }
        ]
      },
      {
        icon: faTachometerAlt,
        name: 'Dashboard v2',
        href: '/'
      }
    ]
  },
  {
    icon: faTachometerAlt,
    name: 'About'
  }
]

export { BASIC_SIDEBAR_MENU }
