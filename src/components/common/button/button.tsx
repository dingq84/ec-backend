/**
 * @author Dean Chen 2021-04-13
 * Button 提供最基本的問題，擁有方形、圓角和圓形的樣式
 * TODO: 新增文字按鈕的樣式
 */

import { ButtonHTMLAttributes, forwardRef } from 'react'
import tw from 'twin.macro'

// types
import type { BasicComponentProps } from '@/types/next'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  BasicComponentProps & {
    label: string | React.ReactNode
    shape?: 'rounded' | 'square' | 'circle'
  }

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  props: ButtonProps,
  ref
) => {
  const { label, className = '', type = 'button', shape = 'rounded', ...restProps } = props

  return (
    <button
      ref={ref}
      type={type}
      className={className}
      css={[
        tw`border-2 border-solid border-primary text-dark-gray-1 focus:(outline-none bg-primary text-gray-100 border-transparent) hover:(outline-none bg-primary text-gray-100 border-transparent)`,
        shape === 'rounded' && tw`py-2 px-10 rounded-3xl `,
        shape === 'circle' && tw`rounded-full w-10 h-10`,
        shape === 'square' && tw`py-2 px-10`
      ]}
      {...restProps}
    >
      {label}
    </button>
  )
}

export default forwardRef(Button)
