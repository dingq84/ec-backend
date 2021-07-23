import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'

// components
import TextField, { TextFieldProps } from '.'

describe('test <TextField />', () => {
  const defaultProps: TextFieldProps = {
    name: 'test',
    label: 'test label',
    id: 'test-label',
    placeholder: 'please enter something'
  }
  describe('test default render', () => {
    it('the id of the input should be "test" ', () => {
      const { container } = render(<TextField {...defaultProps} />)
      expect(container.querySelector('input')?.getAttribute('id')).toBe(defaultProps.id)
    })

    it('the name of the input should be "test" ', () => {
      const { container } = render(<TextField {...defaultProps} />)
      expect(container.querySelector('input')?.getAttribute('name')).toBe(defaultProps.name)
    })

    it('the placeholder of the input should be "text" ', () => {
      const { container } = render(<TextField {...defaultProps} />)
      expect(container.querySelector('input')?.getAttribute('placeholder')).toBe(
        defaultProps.placeholder
      )
    })

    it(`the label should be ${defaultProps.label}`, () => {
      const { container } = render(<TextField {...defaultProps} />)
      expect(container.querySelector('label')).toHaveTextContent(defaultProps.label!)
    })
  })

  it('should render start adornment', () => {
    const { queryByTestId } = render(
      <TextField
        {...defaultProps}
        adornment={{
          start: <h1 data-testid="startAdornment">foo</h1>
        }}
      />
    )
    expect(queryByTestId('startAdornment')).toHaveTextContent('foo')
  })

  it('should render end adornment', () => {
    const { queryByTestId } = render(
      <TextField
        {...defaultProps}
        adornment={{
          end: <h1 data-testid="endAdornment">foo</h1>
        }}
      />
    )
    expect(queryByTestId('endAdornment')).toHaveTextContent('foo')
  })

  it('the type of the input should be password', () => {
    const { container } = render(<TextField {...defaultProps} type="password" />)
    expect(container.querySelector('input')?.getAttribute('type')).toBe('password')
  })

  it('should execute onClear when clicking clear button', () => {
    const clearFn = jest.fn()
    const { queryByTestId } = render(
      <TextField {...defaultProps} value={'123'} onClear={clearFn} />
    )
    const clearSvg = queryByTestId('clear')
    fireEvent.click(clearSvg!)
    expect(clearFn).toHaveBeenCalledTimes(1)
  })

  it('should display error message', () => {
    jest.useFakeTimers()
    const { container } = render(<TextField {...defaultProps} error errorMessage="error message" />)
    jest.runAllTimers()
    expect(container.lastElementChild).toHaveTextContent('error message')
  })
})
