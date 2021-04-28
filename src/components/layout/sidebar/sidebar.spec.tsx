import { render } from '@testing-library/react'

// components
import Sidebar from '.'

// constants
import * as constants from '@/constants/sidebar'

jest.mock('@/states/global/hooks')

describe('test sidebar', () => {
  it('should render correctly', () => {
    // @ts-ignore
    // https://stackoverflow.com/questions/42977961/how-to-mock-an-exported-const-in-jest
    constants.BASIC_SIDEBAR_MENU = [
      {
        name: 'Dashboard',
        children: [
          {
            name: 'Dashboard v1',
            children: [
              {
                name: 'Dashboard v1 v1',
                children: [
                  {
                    name: 'Dashboard v1 v1 v1',
                    href: '/test'
                  }
                ]
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
    const tree = render(<Sidebar />)
    expect(tree).toMatchSnapshot()
  })
})
