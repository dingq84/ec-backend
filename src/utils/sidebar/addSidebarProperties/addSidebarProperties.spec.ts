// utils
import addSidebarProperties from '.'

// types
import { BASIC_SIDEBAR_MENU_TYPE, SIDEBAR_MENU_TYPE } from '@/types/sidebar'

describe('testing addSidebarProperties', () => {
  const basicSidebar: Array<BASIC_SIDEBAR_MENU_TYPE> = [
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
    const sidebarWithProperties: Array<SIDEBAR_MENU_TYPE> = [
      {
        name: 'Dashboard',
        key: '0',
        isOpen: false,
        isActive: false,
        children: [
          {
            name: 'Dashboard v1',
            key: '0-0',
            isOpen: false,
            isActive: false,
            children: [
              {
                name: 'Dashboard v1 v1',
                key: '0-0-0',
                isOpen: false,
                isActive: false,
                href: '/'
              },
              {
                name: 'Dashboard v1 v2',
                key: '0-0-1',
                isOpen: false,
                isActive: false,
                href: '/'
              }
            ]
          },
          {
            name: 'Dashboard v2',
            key: '0-1',
            isOpen: false,
            isActive: false,
            href: '/'
          }
        ]
      },
      {
        name: 'About',
        key: '1',
        isOpen: false,
        isActive: false
      }
    ]
    expect(addSidebarProperties(basicSidebar, '')).toEqual(sidebarWithProperties)
  })

  it("key: 0-0-1 should be active, ant its parent's isOpen should be true", () => {
    const sidebarWithProperties: Array<SIDEBAR_MENU_TYPE> = [
      {
        name: 'Dashboard',
        key: '0',
        isOpen: true,
        isActive: false,
        children: [
          {
            name: 'Dashboard v1',
            key: '0-0',
            isOpen: true,
            isActive: false,
            children: [
              {
                name: 'Dashboard v1 v1',
                key: '0-0-0',
                isOpen: false,
                isActive: false,
                href: '/'
              },
              {
                name: 'Dashboard v1 v2',
                key: '0-0-1',
                isOpen: true,
                isActive: true,
                href: '/'
              }
            ]
          },
          {
            name: 'Dashboard v2',
            key: '0-1',
            isOpen: false,
            isActive: false,
            href: '/'
          }
        ]
      },
      {
        name: 'About',
        key: '1',
        isOpen: false,
        isActive: false
      }
    ]
    expect(addSidebarProperties(basicSidebar, '0-0-1')).toEqual(sidebarWithProperties)
  })
})
