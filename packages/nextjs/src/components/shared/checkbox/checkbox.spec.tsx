import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

// components
import Checkbox from '.'

describe('test <Checkbox />', () => {
  it('should render label if it exists', () => {
    const { container } = render(
      <Checkbox value={false} onChange={() => {}} label="test" id="test" />
    )

    expect(container).toHaveTextContent('test')
  })

  it('should be disabled if the disabled is true', () => {
    const { container } = render(<Checkbox value={false} onChange={() => {}} disabled />)
    const input = container.querySelector('input')
    expect(input).toHaveAttribute('disabled')
  })

  it('should execute onChange function when click checkbox', () => {
    const mockChange = jest.fn()
    const { container } = render(<Checkbox value={false} onChange={mockChange} />)
    userEvent.click(container.querySelector('input')!)
    expect(mockChange).toHaveBeenCalledTimes(1)
    expect(mockChange).toHaveBeenCalledWith(true)
    userEvent.click(container.querySelector('input')!)
    expect(mockChange).toHaveBeenCalledTimes(2)
    expect(mockChange).toHaveBeenCalledWith(false)
  })
  // 這邊有個問題，react-testing-library 在 checkbox is disabled，仍會觸發 onChange
  // 以下會 issue 連結，雖然是快兩年前，但問題似乎依舊存在，改用推薦的套件處理 @testing-library/user-event
  // https://github.com/testing-library/react-testing-library/issues/275
  it('should not execute onChange function when checkbox is disabled', () => {
    const mockChange = jest.fn()
    const { container } = render(<Checkbox value={false} onChange={mockChange} disabled />)
    userEvent.click(container.querySelector('input')!)
    expect(mockChange).toHaveBeenCalledTimes(0)
  })
})
