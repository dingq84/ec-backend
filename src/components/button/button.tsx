import { ButtonHTMLAttributes, forwardRef } from 'react'
import tw from 'twin.macro'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string | React.ReactNode
  className?: string
  shape?: 'rounded' | 'square' | 'circle'
  click?: () => void
}

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  props: ButtonProps,
  ref
) => {
  const { label, className = '', click, type = 'button', shape = 'rounded' } = props

  const handleClick = (): void => {
    if (click) {
      click()
    }
  }

  return (
    <button
      ref={ref}
      type={type}
      className={className}
      onClick={handleClick}
      css={[
        tw`border-2 border-solid border-primary text-dark-gray-1 focus:(outline-none bg-primary text-gray-100 border-transparent) hover:(outline-none bg-primary text-gray-100 border-transparent)`,
        shape === 'rounded' && tw`py-2 px-10 rounded-3xl `,
        shape === 'circle' && tw`rounded-full w-10 h-10`,
        shape === 'square' && tw`py-2 px-10`
      ]}
    >
      {label}
    </button>
  )
}

export default forwardRef(Button)
