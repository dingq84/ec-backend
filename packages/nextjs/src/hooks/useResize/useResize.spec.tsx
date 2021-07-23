import { render, act } from '@testing-library/react'
import '@testing-library/jest-dom'

// hooks
import useResize from '.'

describe('test useResize', () => {
  let handler: jest.Mock

  beforeEach(() => {
    handler = jest.fn()
  })

  afterEach(() => {
    handler.mockReset()
  })

  it('should execute handler after resizing', () => {
    const WrapperComponent = () => {
      useResize({ handler, isDebounced: false })
      return null
    }

    render(<WrapperComponent />)

    expect(handler).toHaveBeenCalledTimes(0)
    act(() => {
      global.dispatchEvent(new Event('resize'))
    })

    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('should execute handler with debounce after resizing', () => {
    jest.useFakeTimers()

    const WrapperComponent = () => {
      useResize({ handler })
      return null
    }

    render(<WrapperComponent />)

    expect(handler).toHaveBeenCalledTimes(0)
    act(() => {
      global.dispatchEvent(new Event('resize'))
    })

    expect(handler).toHaveBeenCalledTimes(0)

    jest.runAllTimers()
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
