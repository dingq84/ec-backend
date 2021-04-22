import { fireEvent, render } from '@testing-library/react'

// components
import Header from '.'

// states
import { useAppDispatch } from '@/states/global/hooks'

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

  it('should renders correctly', () => {
    const tree = render(<Header />)
    expect(tree).toMatchSnapshot()
  })

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
    expect(mockFn.mock.calls[1][0]).toEqual({ type: 'settings/toggleSidebar', payload: undefined })
  })
})
