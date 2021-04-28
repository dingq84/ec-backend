// utils
import addProperties from '.'

// types
import { BASIC_SIDEBAR_MENU_TYPE } from '@/types/sidebar'

describe('test addProperties', () => {
  const basicSidebar = [
    {
      name: 'Dashboard',
      children: [
        {
          name: 'Dashboard v1',
          children: [
            {
              name: 'Dashboard v1 v1',
              href: '/'
            },

            {
              name: 'Dashboard v1 v2',
              href: '/'
            }
          ]
        },

        {
          name: 'Dashboard v2',
          href: '/'
        }
      ]
    },

    {
      name: 'About'
    }
  ]

  it('should equal to sidebarWithProperties', () => {
    const sidebarWithProperties = [
      {
        name: 'Dashboard',
        key: '0',
        isOpen: false,
        isActive: false,
        level: 1,
        children: [
          {
            name: 'Dashboard v1',
            key: '0-0',
            isOpen: false,
            isActive: false,
            level: 2,
            children: [
              {
                name: 'Dashboard v1 v1',
                key: '0-0-0',
                isOpen: false,
                isActive: false,
                href: '/',
                level: 3
              },
              {
                name: 'Dashboard v1 v2',
                key: '0-0-1',
                isOpen: false,
                isActive: false,
                href: '/',
                level: 3
              }
            ]
          },
          {
            name: 'Dashboard v2',
            key: '0-1',
            isOpen: false,
            isActive: false,
            href: '/',
            level: 2
          }
        ]
      },
      {
        name: 'About',
        key: '1',
        isOpen: false,
        isActive: false,
        level: 1
      }
    ]
    expect(addProperties(basicSidebar as BASIC_SIDEBAR_MENU_TYPE[], '')).toEqual(
      sidebarWithProperties
    )
  })
})
