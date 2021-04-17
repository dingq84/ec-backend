import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

// components
import Paper from '.'

describe('testing <Paper />', () => {
  it('should render children', () => {
    const { queryByTestId } = render(
      <Paper>
        <h1 data-testid="paper">test paper</h1>
      </Paper>
    )
    expect(queryByTestId('paper')).toHaveTextContent('test paper')
  })
})
