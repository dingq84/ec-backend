import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

// hooks
import useIsMobile from '.'

describe('test useIsMobile', () => {
  it('should return false in desktop mode', () => {
    global.innerWidth = 768
    const WrapperComponent = () => {
      const isMobile = useIsMobile()

      return <div>{String(isMobile)}</div>
    }

    const { container } = render(<WrapperComponent />)
    expect(container).toHaveTextContent('false')
  })

  it('should return true in mobile mode', () => {
    global.innerWidth = 767
    const WrapperComponent = () => {
      const isMobile = useIsMobile()

      return <div>{String(isMobile)}</div>
    }

    const { container } = render(<WrapperComponent />)
    expect(container).toHaveTextContent('true')
  })
})
