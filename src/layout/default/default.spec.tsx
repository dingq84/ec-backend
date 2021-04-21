import { render } from '@testing-library/react'

// layouts
import DefaultLayout from '.'

// states
import { useAppDispatch } from '@/states/global/hooks'

jest.mock('react-redux')
jest.mock('@/states/global/hooks')

describe('testing <DefaultLayout />', () => {
  beforeAll(() => {
    // @ts-ignore
    useAppDispatch.mockImplementation(() => () => {})
  })
  it('should render correctly', () => {
    const tree = render(
      <DefaultLayout>
        <h1>default testing</h1>
      </DefaultLayout>
    )
    expect(tree).toMatchSnapshot()
  })
})
