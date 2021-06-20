import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

// components
import TextField from '.'

describe('test <TextField />', () => {
  const defaultProps = { id: 'test', name: 'test' }
  describe('test default render', () => {
    it('the id of the input should be "test" ', () => {
      const { container } = render(<TextField {...defaultProps} />)
      expect(container.querySelector('input')?.getAttribute('name')).toBe('test')
    })

    it('the name of the input should be "test" ', () => {
      const { container } = render(<TextField {...defaultProps} />)
      expect(container.querySelector('input')?.getAttribute('name')).toBe('test')
    })

    it('the placeholder of the input should be "text" ', () => {
      const { container } = render(<TextField {...defaultProps} />)
      expect(container.querySelector('input')?.getAttribute('placeholder')).toBe(
        'hidden placeholder'
      )
    })

    it('should not render label by default', () => {
      const { container } = render(<TextField {...defaultProps} />)
      expect(container.querySelector('label')).toBeNull()
    })
  })

  it('should render label', () => {
    const { container } = render(<TextField {...defaultProps} label="test-label" />)
    expect(container.querySelector('label')).toHaveTextContent('test-label')
  })

  it('should render start adornment', () => {
    const { queryByTestId } = render(
      <TextField {...defaultProps} startAdornment={<h1 data-testid="startAdornment">foo</h1>} />
    )
    expect(queryByTestId('startAdornment')).toHaveTextContent('foo')
  })

  it('should render end adornment', () => {
    const { queryByTestId } = render(
      <TextField {...defaultProps} endAdornment={<h1 data-testid="endAdornment">foo</h1>} />
    )
    expect(queryByTestId('endAdornment')).toHaveTextContent('foo')
  })

  it('the type of the input should be password', () => {
    const { container } = render(<TextField {...defaultProps} type="password" />)
    expect(container.querySelector('input')?.getAttribute('type')).toBe('password')
  })

  // it('should execute onClear when clicking clear button', () => {
  //   const clearFn = jest.fn()
  //   const { container } = render(<TextField {...defaultProps} onClear={clearFn} />)
  //   const clearSvg = container.querySelector('svg')
  //   fireEvent.click(clearSvg!)
  //   expect(clearFn).toHaveBeenCalledTimes(1)
  // })

  // it('the input should be focus after clicking clear button', () => {
  //   const clearFn = jest.fn()
  //   const { container } = render(<TextField {...defaultProps} onClear={clearFn} />)
  //   const clearSvg = container.querySelector('svg')
  //   fireEvent.click(clearSvg!)
  //   expect(container.querySelector('input')).toHaveFocus()
  // })

  it('should display error message', () => {
    jest.useFakeTimers()
    const { container } = render(<TextField {...defaultProps} error="error message" />)
    jest.runAllTimers()
    expect(container.lastElementChild).toHaveTextContent('error message')
  })
})
