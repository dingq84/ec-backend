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
