import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

// components
import Backdrop from '.'

describe('test <Backdrop />', () => {
  it('should render a backdrop div with content of nested children', () => {
    const { container } = render(
      <Backdrop inProps>
        <h1>Hello World</h1>
      </Backdrop>
    )
    expect(container.querySelector('h1')).toHaveTextContent('Hello World')
  })
})
