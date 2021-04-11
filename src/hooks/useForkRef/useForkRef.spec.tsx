import { render } from '@testing-library/react'
import { useState, useRef, useEffect } from 'react'

// hooks
import useForkRef from '.'

describe('Testing useForkRef', () => {
  it('refA should be equal to refB', () => {
    const WrapperComponent = () => {
      const refA = useRef<HTMLDivElement>(null)
      const refB = useRef<HTMLDivElement>(null)
      const forkRef = useForkRef(refA, refB)
      const [stateA, setStateA] = useState<HTMLDivElement>()
      const [stateB, setStateB] = useState<HTMLDivElement>()

      useEffect(() => {
        setStateA(refA.current!)
        setStateB(refB.current!)
      }, [])

      return (
        <div ref={forkRef} data-testid="container">
          <span data-testid="refA">{stateA?.innerHTML}</span>
          <span data-testid="refB">{stateB?.innerHTML}</span>
        </div>
      )
    }

    const { queryByTestId } = render(<WrapperComponent />)
    expect(queryByTestId('refA')?.textContent).toEqual(queryByTestId('refB')?.textContent)
  })
})
