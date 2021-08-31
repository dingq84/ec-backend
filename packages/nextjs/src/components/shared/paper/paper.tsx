/**
 * @author Dean Chen 2021-04-15
 * Paper 提供一個基本框框的樣式，靈感來自 Material-UI Paper
 *
 * @modified
 * [Dean Chen 2021-04-23]: 原本傳遞 className 的方法會無法修改預設樣式，因為 twin 的 priority 高於 className，
 * 因此實現一個 workaround 的方式，開一個 css 接口，如此外部可傳入 tw 或是 css
 */

import { forwardRef, HTMLAttributes } from 'react'
import { css } from 'twin.macro'

export interface PaperProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  shadow?: boolean
}

const shadowCss = css`
  & {
    box-shadow: 0px 4px 4px rgba(103, 103, 103, 0.25);
  }
`

const Paper = forwardRef<HTMLDivElement, PaperProps>(function Paper(props: PaperProps, ref) {
  const { shadow = true, children, ...restProps } = props
  return (
    <div
      ref={ref}
      tw="bg-white w-full p-4 rounded-lg flex justify-center items-center sm:(w-auto) md:(inline-flex py-8 px-12)"
      css={[shadow && shadowCss]}
      {...restProps}
    >
      {children}
    </div>
  )
})

export default Paper
