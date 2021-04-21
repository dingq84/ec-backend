import { fireEvent, render } from '@testing-library/react'

// components
import Header from '.'

// hooks
import useResize from '@/hooks/useResize'

// states
import { useAppDispatch } from '@/states/global/hooks'

jest.mock('@/states/global/hooks')
jest.mock('@/hooks/useResize')

describe('testing <Header />', () => {
  let mockFn: jest.Mock
  beforeAll(() => {
    mockFn = jest.fn()
    // @ts-ignore
    useAppDispatch.mockImplementation(() => props => mockFn(props))
  })

  afterEach(() => {
    mockFn.mockReset()
  })

  it('should renders correctly', () => {
    const tree = render(<Header />)
    expect(tree).toMatchSnapshot()
  })

  it('should update sidebarIsExtend when mounted in desktop', () => {
    // @ts-ignore
    useResize.mockReturnValue(false)
    render(<Header />)
    expect(mockFn.mock.calls[0][0]).toEqual({ type: 'settings/setSidebar', payload: true })
  })

  it('should update sidebarIsExtend when mounted in mobile', () => {
    // @ts-ignore
    useResize.mockReturnValue(true)
    render(<Header />)
    expect(mockFn.mock.calls[0][0]).toEqual({ type: 'settings/setSidebar', payload: false })
  })

  it('should trigger menu click', () => {
    const { queryByTestId } = render(<Header />)
    const menu = queryByTestId('menu')
    fireEvent.click(menu!)
    expect(mockFn.mock.calls[1][0]).toEqual({ type: 'settings/toggleSidebar', payload: undefined })
  })
})
