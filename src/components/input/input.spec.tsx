import { render } from '@testing-library/react'

import '@testing-library/jest-dom'

// components
import Input from '.'

describe('testing <Input />', () => {
  const defaultProps = { id: 'test' }
  it('should render label', () => {
    const { queryByLabelText } = render(<Input {...defaultProps} label="test" />)
    expect(queryByLabelText('test')).toBeTruthy()
  })
})
