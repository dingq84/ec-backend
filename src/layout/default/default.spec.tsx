import { render } from '@testing-library/react'

// layouts
import DefaultLayout from '.'

jest.mock('react-redux')

describe('testing <DefaultLayout />', () => {
  it('should render correctly', () => {
    const tree = render(
      <DefaultLayout>
        <h1>default testing</h1>
      </DefaultLayout>
    )
    expect(tree).toMatchSnapshot()
  })
})
