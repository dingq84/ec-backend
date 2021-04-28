/**
 * @author Dean Chen 2021-04-13
 * @link https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Backdrop/Backdrop.js
 * Backdrop 主要是為了製作 Modal，參考 Material-UI 的 Modal 程式碼而順手建立，
 * 主要建立一個 display: fixed 的黑幕
 *
 * @modified
 * Dean Chen 2021-04-26]: 調整 invisible 的時候，寬高調整成 0
 * Dean Chen 2021-04-27]: 調整 invisible 的時候，背景為透明，並新增 hidden 控制寬高是否為 0
 */

import { DOMAttributes, forwardRef } from 'react'
import tw from 'twin.macro'

// components
import Fade from '@/components/common/fade'

// types
import type { TransitionProps } from '@/types/transition'
import type { BasicComponentProps } from '@/types/next'

export type BackdropType = DOMAttributes<HTMLElement> &
  TransitionProps &
  BasicComponentProps & {
    inProps: boolean
    invisible?: boolean
    hidden?: boolean
  }

const Backdrop: React.ForwardRefRenderFunction<HTMLDivElement, BackdropType> = (
  props: BackdropType,
  ref
) => {
  const {
    inProps,
    children,
    invisible = false,
    timeout = 500,
    hidden = false,
    ...restProps
  } = props
  return (
    <Fade inProps={inProps} timeout={timeout} {...restProps}>
      <div
        ref={ref}
        css={[
          tw`fixed flex items-center justify-center bg-transparent -webkit-tap-highlight-color[transparent]`,
          invisible === false && tw`bg-black bg-opacity-50`,
          hidden === false && tw`top-0 left-0 right-0 bottom-0`
        ]}
      >
        {children}
      </div>
    </Fade>
  )
}

export default forwardRef(Backdrop)
