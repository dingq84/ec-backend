import { useState } from 'react'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'

// components
import Fade from '.'

describe('Testing <Fade />', () => {
  describe('Testing transition lifecycle', () => {
    const handleEnter = jest.fn()
    const handleEntering = jest.fn()
    const handleEntered = jest.fn()
    const handleExit = jest.fn()
    const handleExiting = jest.fn()
    const handleExited = jest.fn()

    const WrapperComponent = () => {
      const [isOpen, setIsOpen] = useState(false)

      return (
        <>
          <button data-testid="button" onClick={() => setIsOpen(i => !i)}>
            click
          </button>
          <Fade
            inProps={isOpen}
            onEnter={handleEnter}
            onEntered={handleEntered}
            onEntering={handleEntering}
            onExit={handleExit}
            onExited={handleExited}
            onExiting={handleExiting}
          >
            <h1>fade testing</h1>
          </Fade>
        </>
      )
    }

    beforeEach(() => {
      jest.useFakeTimers()
    })

    it('calls the appropriate callbacks for each transition', () => {
      const { queryByTestId, container } = render(<WrapperComponent />)
      const child = container.querySelector('h1')
      const button = queryByTestId('button') as HTMLButtonElement
      fireEvent.click(button)

      expect(handleEnter).toHaveBeenCalledTimes(1)
      expect(handleEnter.mock.calls[0][0]).toEqual(child)

      expect(handleEntering).toHaveBeenCalledTimes(1)
      expect(handleEntering.mock.calls[0][0]).toEqual(child)

      jest.runAllTimers()

      expect(handleEntered).toHaveBeenCalledTimes(1)
      expect(handleEntered.mock.calls[0][0]).toEqual(child)

      fireEvent.click(button)

      expect(handleExit).toHaveBeenCalledTimes(1)
      expect(handleExit.mock.calls[0][0]).toEqual(child)

      expect(handleExiting).toHaveBeenCalledTimes(1)
      expect(handleExiting.mock.calls[0][0]).toEqual(child)

      jest.runAllTimers()

      expect(handleExited).toHaveBeenCalledTimes(1)
      expect(handleExited.mock.calls[0][0]).toEqual(child)
    })
  })

  describe('test props: appear', () => {
    it('should work when initially hidden, appear = true', () => {
      const { container } = render(
        <Fade inProps={false} appear>
          <div>test fade</div>
        </Fade>
      )

      const element = container.querySelector('div')

      expect(element).toHaveStyle({ opacity: 0 })
      expect(element).toHaveStyle({ visibility: 'hidden' })
    })
  })

  it('should work when initially hidden, appear = false', () => {
    const { container } = render(
      <Fade inProps={false} appear={false}>
        <div>test fade</div>
      </Fade>
    )

    const element = container.querySelector('div')

    expect(element).toHaveStyle({ opacity: 0 })
    expect(element).toHaveStyle({ visibility: 'hidden' })
  })
})
