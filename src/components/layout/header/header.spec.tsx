import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'

// components
import Header from '.'

// states
import { useAppDispatch, useAppSelector } from '@/states/global/hooks'

jest.mock('@/states/global/hooks')

describe('testing <Header />', () => {
  let mockFn: jest.Mock
  beforeAll(() => {
    mockFn = jest.fn()
    ;(useAppDispatch as jest.Mock).mockImplementation(() => (props: any) => mockFn(props))
  })

  afterEach(() => {
    mockFn.mockReset()
  })

  describe('testing render', () => {
    it('should render correctly', () => {
      const tree = render(<Header />)
      expect(tree).toMatchSnapshot()
    })

    it('should render AdminLTE when sidebarIsExtend equals true in desktop mode', () => {
      global.innerWidth = 768
      ;(useAppSelector as jest.Mock).mockReturnValue(true)
      const { queryByTestId } = render(<Header />)
      const logo = queryByTestId('logo')
      expect(logo).toHaveTextContent('AdminLTE')
    })

    it('should render AdminLTE in mobile mode', () => {
      global.innerWidth = 767
      const { queryByTestId } = render(<Header />)
      const logo = queryByTestId('logo')
      expect(logo).toHaveTextContent('AdminLTE')
    })

    it('should render ALT when sidebarIsExtend equals false in desktop mode', () => {
      global.innerWidth = 768
      ;(useAppSelector as jest.Mock).mockReturnValue(false)
      const { queryByTestId } = render(<Header />)
      const logo = queryByTestId('logo')
      expect(logo).toHaveTextContent('ALT')
    })
  })

  describe('testing redux dispatch and selector', () => {
    it('should update sidebarIsExtend when mounted in desktop', () => {
      global.innerWidth = 768

      render(<Header />)
      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn.mock.calls[0][0]).toEqual({ type: 'settings/setSidebar', payload: true })
    })

    it('should update sidebarIsExtend when mounted in mobile', () => {
      global.innerWidth = 767
      render(<Header />)

      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn.mock.calls[0][0]).toEqual({ type: 'settings/setSidebar', payload: false })
    })

    it('should trigger menu click', () => {
      const { queryByTestId } = render(<Header />)
      const menu = queryByTestId('menu')
      fireEvent.click(menu!)
      expect(mockFn).toHaveBeenCalledTimes(2)
      expect(mockFn.mock.calls[1][0]).toEqual({
        type: 'settings/toggleSidebar',
        payload: undefined
      })
    })
  })

  describe('testing popover', () => {
    it('should render popover when click functions', () => {
      const { queryByTestId } = render(<Header />)
      expect(document.body.querySelector('[class*="popover"]')).toBeNull()

      const functions = queryByTestId('functions')
      fireEvent.click(functions!)
      expect(document.body.querySelector('[class*="popover"]')).toBeTruthy()
    })
  })
})
