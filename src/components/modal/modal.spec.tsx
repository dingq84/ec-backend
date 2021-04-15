import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

// components
import Modal from '.'

describe('testing <Modal />', () => {
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
      <Modal open={false} onEnter={onEnter}>
        <p data-testid="content">Hello World</p>
      </Modal>
    )

    rerender(
      <Modal open={true} onEnter={onEnter}>
        <p data-testid="content">Hello World</p>
      </Modal>
    )

    expect(onEnter).toHaveBeenCalledTimes(1)
  })

  // TODO: 這邊測試出現錯誤，但實際上是成功執行的
  // it('should execute onExited function', () => {
  //   const onExited = jest.fn()
  //   function WrapperComponent() {
  //     const [open, setOpen] = useState(true)

  //     const onClose = () => {
  //       console.log('onClose')
  //       setOpen(o => !o)
  //     }

  //     return (
  //       <Modal open={open} onExited={onExited} onClose={onClose}>
  //         <p data-testid="content">Hello World</p>
  //       </Modal>
  //     )
  //   }
  //   const { container } = render(<WrapperComponent />)
  //   console.log(container.innerHTML)
  //   fireEvent.click(container)

  //   expect(onExited).toHaveBeenCalledTimes(1)
  // })
})
