import { render } from '@testing-library/react'

// components
import Loading from '.'

describe('test <Loading />', () => {
  it('should render loading component', () => {
    render(<Loading isLoading />)
    expect(document.body.querySelector('svg')).toBeTruthy()
  })

  it('should not render loading component', () => {
    render(<Loading isLoading={false} />)
    expect(document.body.querySelector('svg')).toBeFalsy()
  })
})
