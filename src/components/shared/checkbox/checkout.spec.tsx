import { useState } from 'react'
import { fireEvent, render } from '@testing-library/react'
import tw from 'twin.macro'
import '@testing-library/jest-dom'

// components
import Checkbox from '.'

describe('test <Checkbox />', () => {
  describe('test props', () => {
    it('the span should have ml-1 class name by default', () => {
      const { container } = render(
        <Checkbox checked={false} toggleChecked={() => {}} label="test" />
      )
      const span = container.querySelector('span')
      expect(span!.classList.contains('ml-1')).toBeTruthy()
    })

    it('the label should have two className if isReverse is true', () => {
      const { container } = render(
        <Checkbox checked={false} toggleChecked={() => {}} label="test" isReverse />
      )
      const span = container.querySelector('span')
      expect(span!.classList.contains('mr-1')).toBeTruthy()
    })

    it('should render label if it exists', () => {
      const { container } = render(
        <Checkbox checked={false} toggleChecked={() => {}} label="test" />
      )

      expect(container).toHaveTextContent('test')
    })

    it('should be disabled if the disabled is true', () => {
      const { container } = render(<Checkbox checked={false} toggleChecked={() => {}} disabled />)
      const input = container.querySelector('input')
      expect(input).toHaveAttribute('disabled')
    })

    it('the span should have customize style if textStyle is not empty ', () => {
      const { container } = render(
        <Checkbox
          checked={false}
          toggleChecked={() => {}}
          textStyle={{ css: tw`text-green-50` }}
          label="test"
        />
      )
      const span = container.querySelector('span')
      expect(span?.getAttribute('css')).toBeTruthy()
    })
  })

  describe('test checked and toggleChecked', () => {
    it('the input should be not checked if the checked is false', () => {
      const { container } = render(<Checkbox checked={false} toggleChecked={() => {}} />)
      const input = container.querySelector('input')
      expect(input).not.toBeChecked()
    })

    it('the input should be checked if clicking the checkbox', () => {
      const WrapperComponent = () => {
        const [checked, setChecked] = useState(false)

        return (
          <Checkbox checked={checked} toggleChecked={event => setChecked(event.target.checked)} />
        )
      }
      const { container } = render(<WrapperComponent />)
      fireEvent.click(container.querySelector('label')!)

      expect(container.querySelector('input')).toBeChecked()
    })
  })
})
