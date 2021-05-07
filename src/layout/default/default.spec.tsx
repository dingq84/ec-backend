import { useRouter } from 'next/router'
import { render } from '@testing-library/react'

// layouts
import DefaultLayout from '.'

// states
import { useAppDispatch } from '@/states/global/hooks'

jest.mock('next/router')
jest.mock('react-redux')
jest.mock('@/states/global/hooks')

describe('test <DefaultLayout />', () => {
  beforeAll(() => {
    ;(useAppDispatch as jest.Mock).mockImplementation(() => () => {})
    ;(useRouter as jest.Mock).mockImplementation(() => ({ pathname: '' }))
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
