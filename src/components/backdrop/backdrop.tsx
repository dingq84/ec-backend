/**
 * @author Dean Chen 2021-04-13
 * @link https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Backdrop/Backdrop.js
 * Backdrop 主要是為了製作 Modal，參考 Material-UI 的 Modal 程式碼而順手建立，
 * 主要建立一個 display: fixed 的黑幕
 */

import { forwardRef } from 'react'
import tw from 'twin.macro'

// components
import Fade from '@/components/fade'

type BackdropType = {
  inProps: boolean
  children: React.ReactNode
  invisible?: boolean
  timeout?: number
}

const Backdrop = forwardRef<HTMLDivElement, BackdropType>(function BackDrop(
  props: BackdropType,
  ref
) {
  const { inProps, children, invisible = false, timeout = 500 } = props

  return (
    <Fade inProps={inProps} timeout={timeout}>
      <div
        ref={ref}
        css={[
          tw`fixed flex items-center justify-center top-0 left-0 bg-black bg-opacity-50 -webkit-tap-highlight-color[transparent]`,
          invisible && tw`bg-transparent`
        ]}
      >
        {children}
      </div>
    </Fade>
  )
})

export default Backdrop
