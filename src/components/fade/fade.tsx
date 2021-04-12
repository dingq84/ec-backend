import { forwardRef, cloneElement, useRef } from 'react'
import { Transition } from 'react-transition-group'
import tw from 'twin.macro'

// hooks
import useForkRef from '@/hooks/useForkRef'

// types
import { Status } from '@/types/transition'

type FadeProps = {
  appear?: boolean
  inProps: boolean
  timeout?: number
  onEntering?: Function
  onEnter?: Function
  onEntered?: Function
  onExiting?: Function
  onExit?: Function
  onExited?: Function
  // 這邊不使用 ReactNode，原因為 TS 會一直警告 children 無 ref 和 props，
  // https://github.com/Microsoft/TypeScript/issues/6471
  // 上述 issue 解決方式為 any
  children: any
}

const Fade = forwardRef<HTMLElement, FadeProps>(function Fade(props: FadeProps, ref): JSX.Element {
  const {
    inProps,
    children,
    onEntering,
    onEnter,
    onEntered,
    onExiting,
    onExit,
    onExited,
    appear = true,
    timeout = 500
  } = props
  const nodeRef = useRef<HTMLElement>(null)
  const foreignRef = useForkRef(children.ref, ref)
  const handleRef = useForkRef(nodeRef, foreignRef)

  const normalizedTransitionCallback = (callback?: Function) => (maybeIsAppearing?: any): void => {
    if (callback) {
      const node = nodeRef.current!

      // onEnterXxx and onExitXxx callbacks have a different arguments.length value.
      if (maybeIsAppearing === undefined) {
        callback(node)
      } else {
        callback(node, maybeIsAppearing)
      }
    }
  }

  const reflow = (node: HTMLElement) => node.scrollTop

  const handleEntering = normalizedTransitionCallback(onEntering)

  const handleEnter = normalizedTransitionCallback((node: HTMLElement, isAppearing: any) => {
    reflow(node) // So the animation always start from the start.

    if (onEnter) {
      onEnter(node, isAppearing)
    }
  })

  const handleEntered = normalizedTransitionCallback(onEntered)
  const handleExiting = normalizedTransitionCallback(onExiting)
  const handleExit = normalizedTransitionCallback(onExit)
  const handleExited = normalizedTransitionCallback(onExited)

  return (
    <Transition
      appear={appear}
      timeout={timeout}
      in={inProps}
      nodeRef={nodeRef}
      onEntering={handleEntering}
      onEnter={handleEnter}
      onEntered={handleEntered}
      onExiting={handleExiting}
      onExit={handleExit}
      onExited={handleExited}
    >
      {(status: Status) => {
        const isEntering = status === Status.entering || status === Status.entered
        const isExited = status === Status.exited && !inProps

        return cloneElement(children, {
          tw: 'text-lg',
          style: {
            ...tw`transition-opacity`,
            visibility: isExited ? 'hidden' : 'visible',
            opacity: isEntering ? 1 : 0,
            ...children.props.style
          },
          ref: handleRef
        })
      }}
    </Transition>
  )
})

export default Fade
