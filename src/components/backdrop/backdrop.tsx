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
