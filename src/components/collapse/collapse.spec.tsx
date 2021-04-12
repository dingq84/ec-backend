import Collapse from '.'
import { render, queryByRole, fireEvent } from '@testing-library/react'
import { useState } from 'react'

describe('test <Collapse />', () => {
  const defaultProps = {
    inProps: true,
    children: <div>children</div>
  }

  it('should render a root around the wrapper', () => {
    const { container } = render(<Collapse {...defaultProps} />)
    const root = container.firstElementChild as HTMLElement
    expect(queryByRole(container, 'root')).toEqual(root)
  })

  it('should render a wrapper around the wrapper inner', () => {
    const { container } = render(<Collapse {...defaultProps} />)
    const root = container.firstElementChild as HTMLElement
    const wrapper = root.firstElementChild as HTMLElement
    expect(queryByRole(root, 'wrapper')).toEqual(wrapper)
  })

  it('should render a inner wrapper around children', () => {
    const { container } = render(<Collapse {...defaultProps} />)
    const root = container.firstElementChild as HTMLElement
    const wrapper = root.firstElementChild as HTMLElement
    const wrapperInner = wrapper.firstElementChild as HTMLElement
    expect(queryByRole(wrapper, 'inner')).toEqual(wrapperInner)
    expect(wrapperInner.firstElementChild?.textContent).toBe('children')
  })

  describe('test Transition lifecycle', () => {
    let nodeEnterHeightStyle = 0
    let nodeEnteringHeightStyle = 0
    let nodeExitHeightStyle = 0
    let collapse: HTMLElement
    let container: HTMLElement
    let button: HTMLButtonElement

    const handleEnter = jest.fn()
    const handleEnterWrapper = (...args: any[]) => {
      handleEnter(...args)
      nodeEnterHeightStyle = args[0].style.maxHeight
    }
    const handleEntering = jest.fn()
    const handleEnteringWrapper = (...args: any[]) => {
      handleEntering(...args)
      nodeEnteringHeightStyle = args[0].style.maxHeight
    }
    const handleEntered = jest.fn()
    const handleExit = jest.fn()
    const handleExitWrapper = (...args: any[]) => {
      handleExit(...args)
      nodeExitHeightStyle = args[0].style.maxHeight
    }
    const handleExiting = jest.fn()
    const handleExited = jest.fn()

    beforeEach(() => {
      const WrapperComponent = () => {
        const [isOpen, setIsOpen] = useState(false)

        return (
          <>
            <button data-testid="button" onClick={() => setIsOpen(i => !i)}>
              click
            </button>
            <Collapse
              inProps={isOpen}
              onEnter={handleEnterWrapper}
              onEntering={handleEnteringWrapper}
              onEntered={handleEntered}
              onExit={handleExitWrapper}
              onExiting={handleExiting}
              onExited={handleExited}
              timeout={300}
            >
              <div />
            </Collapse>
          </>
        )
      }

      const renderProps = render(<WrapperComponent />)
      container = renderProps.container
      collapse = container.lastElementChild as HTMLElement

      button = renderProps.queryByTestId('button') as HTMLButtonElement
      jest
        .spyOn(collapse.firstElementChild as HTMLElement, 'clientHeight', 'get')
        .mockReturnValue(600)

      jest.useFakeTimers()
    })

    it('should run in', async () => {
      fireEvent.click(button)
      expect(nodeEnterHeightStyle).toBe('0px')
      expect(handleEnter.mock.calls[0][0]).toBe(collapse)
      expect(handleEnter.mock.calls[0][1]).toBe(false)
      expect(nodeEnteringHeightStyle).toBe('600px')
      expect(handleEntering).toHaveBeenCalledTimes(1)
      expect(handleEntering.mock.calls[0][0]).toBe(collapse)
      expect(handleEntering.mock.calls[0][1]).toBe(false)

      jest.runAllTimers()
      expect(handleEntered.mock.calls[0][0].style.maxHeight).toBe('auto')
      expect(handleEntered.mock.calls[0][1]).toBe(false)
      expect(handleEntered).toHaveBeenCalledTimes(1)
    })

    it('should run out', () => {
      // run in
      fireEvent.click(button)
      // run out
      fireEvent.click(button)
      expect(nodeExitHeightStyle).toBe('600px')
      expect(handleExiting.mock.calls[0][0].style.maxHeight).toBe('0px')
      expect(handleExiting).toHaveBeenCalledTimes(1)
      expect(handleExiting.mock.calls[0][0]).toEqual(collapse)

      jest.runTimersToTime(300)
      expect(handleExited.mock.calls[0][0].style.maxHeight).toBe('0px')
      expect(handleExited).toHaveBeenCalledTimes(1)
      expect(handleExited.mock.calls[0][0]).toBe(collapse)
    })
  })

  describe('test collapsedSize', () => {
    const collapsedSize = '10px'

    it('should work when closed', () => {
      const { container } = render(<Collapse {...defaultProps} collapsedSize={collapsedSize} />)
      const collapse = container.firstElementChild as HTMLElement
      expect(collapse.style.minHeight).toBe(collapsedSize)
    })

    it('should be taken into account in handleExiting', () => {
      const handleExiting = jest.fn()
      const WrapperComponent = () => {
        const [isOpen, setOpen] = useState(true)

        return (
          <>
            <button data-testid="button" onClick={() => setOpen(o => !o)}>
              click
            </button>
            <Collapse inProps={isOpen} onExiting={handleExiting} collapsedSize={collapsedSize}>
              <div />
            </Collapse>
          </>
        )
      }
      const { queryByTestId } = render(<WrapperComponent />)
      const button = queryByTestId('button') as HTMLButtonElement
      fireEvent.click(button)
      expect(handleExiting.mock.calls[0][0].style.maxHeight).toBe(collapsedSize)
    })
  })
})
