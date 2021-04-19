import { render, act } from '@testing-library/react'
import '@testing-library/jest-dom'

// hooks
import useResize from '.'

describe('testing useResize', () => {
  const WrapperComponent = () => {
    const isMobile = useResize()
    return <h1>{String(isMobile)}</h1>
  }

  it('should get true when window.innerWidth is less than 768', () => {
    const { container } = render(<WrapperComponent />)
    global.innerWidth = 767
    act(() => {
      global.dispatchEvent(new Event('resize'))
    })

    expect(container).toHaveTextContent('true')
  })

  it('should get false when window.innerWidth is great than 768', () => {
    const { container } = render(<WrapperComponent />)
    global.innerWidth = 768
    act(() => {
      global.dispatchEvent(new Event('resize'))
    })

    expect(container).toHaveTextContent('false')
  })
})
