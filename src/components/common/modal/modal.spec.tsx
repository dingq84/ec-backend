import { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

// components
import Modal from '.'

describe('test <Modal />', () => {
  it('should render the children by open: true', () => {
    const { queryByTestId } = render(
      <Modal open>
        <p data-testid="content">Hello World</p>
      </Modal>
    )

    expect(queryByTestId('content')).toHaveTextContent('Hello World')
  })

  it('should not render the children by open: false', () => {
    const { queryByTestId } = render(
      <Modal open={false}>
        <p data-testid="content">Hello World</p>
      </Modal>
    )

    expect(queryByTestId('content')).toEqual(null)
  })

  it('should execute onEnter function', () => {
    const onEnter = jest.fn()
    const { rerender } = render(
      <Modal open={false} backdropProps={{ onEnter }}>
        <p data-testid="content">Hello World</p>
      </Modal>
    )

    rerender(
      <Modal open={true} backdropProps={{ onEnter }}>
        <p data-testid="content">Hello World</p>
      </Modal>
    )

    expect(onEnter).toHaveBeenCalledTimes(1)
  })

  it('should execute onExited function', () => {
    jest.useFakeTimers()
    const onExited = jest.fn()
    function WrapperComponent() {
      const [open, setOpen] = useState(true)

      const onClose = () => {
        setOpen(o => !o)
      }

      return (
        <Modal open={open} backdropProps={{ onExited }} onClose={onClose}>
          <p data-testid="content">Hello World</p>
        </Modal>
      )
    }

    render(<WrapperComponent />)
    fireEvent.click(document.body.querySelector("[class*='backdrop']")!)

    jest.runAllTimers()
    expect(onExited).toHaveBeenCalledTimes(1)
  })
})
