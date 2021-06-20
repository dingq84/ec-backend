/**
 * @author Dean Chen 2021-04-28
 * Checkbox 使用 svg 達到動畫的效果，但無法使用 font awesome 處理，因此額外使用 svg
 * 這邊使用寫 sass 原因為 tailwind 沒有太多 stroke 的設定，
 * 而且有一個 :checked 的變化，覺得透過 js 驅動有點笨拙，
 * 因此本 component 使用 sass 處理
 * 有 conditional 的部分才會透過 twin.macro - css 處理
 */

import type { HTMLAttributes, ChangeEvent } from 'react'
import tw, { css, TwStyle } from 'twin.macro'

const checkboxCss = css`
  & {
    ${tw`inline-flex items-center relative cursor-pointer`}

    & svg {
      & path {
        ${tw`fill-current text-gray-200`}
      }

      & polyline {
        stroke-dasharray: 70;
        stroke-dashoffset: 70;
        stroke-width: 8;
        fill: none;
        transition: stroke-dashoffset 0.3s linear;
      }
    }

    & input {
      ${tw`invisible opacity-0 absolute top-0 left-0`}

      &:checked + svg > polyline {
        stroke-dashoffset: 0;
        ${tw`stroke-current text-green-1`}
      }
    }

    & span {
      ${tw`text-sm`}
    }
  }
`

type CheckboxProps = HTMLAttributes<HTMLLabelElement> & {
  checked: boolean
  toggleChecked: (event: ChangeEvent<HTMLInputElement>) => void
  isReverse?: boolean // If true, 字和框會相反
  label?: string
  textStyle?: TwStyle
  disabled?: boolean
}

function Checkbox(props: CheckboxProps) {
  const {
    checked,
    toggleChecked,
    label,
    isReverse = false,
    textStyle = {},
    disabled = false,
    ...restProps
  } = props

  return (
    <label css={[checkboxCss, isReverse && tw`flex-row-reverse`]} {...restProps}>
      <input type="checkbox" checked={checked} onChange={toggleChecked} disabled={disabled} />
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" tw="w-4 h-4">
        <path d="M82,89H18c-3.87,0-7-3.13-7-7V18c0-3.87,3.13-7,7-7h64c3.87,0,7,3.13,7,7v64C89,85.87,85.87,89,82,89z" />
        <polyline points="25.5,53.5 39.5,67.5 72.5,34.5" />
      </svg>
      {label ? (
        <span className={`text-gray-700 text-sm ${isReverse ? 'mr-1' : 'ml-1'}`} {...textStyle}>
          {label}
        </span>
      ) : null}
    </label>
  )
}

export default Checkbox
