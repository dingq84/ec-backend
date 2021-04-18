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
    // @ts-ignore
    useAppDispatch.mockImplementation(() => props => mockFn(props))
  })

  it('should renders correctly', () => {
    const tree = render(<Header />)
    expect(tree).toMatchSnapshot()
  })

  it('should trigger menu click', () => {
    const { queryByTestId } = render(<Header />)
    const menu = queryByTestId('menu')
    fireEvent.click(menu!)
    expect(mockFn.mock.calls[0][0]).toEqual({ type: 'settings/toggleSidebar', payload: undefined })
  })
})
