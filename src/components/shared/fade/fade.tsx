/**
 * @author Dean Chen 2021-04-12
 * @link https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Fade/Fade.js
 * Fade 主要是為了製作動畫 Fade-in 和 Fade-out，主要程式碼借鏡 Material-UI，和 Collapse 邏輯相似且更為簡單
 * 透過 react-transition-group 的生命週期處理動畫，而且僅調用 opacity
 *
 * @modified
 * [Dean Chen 2021-05-07]: 為了兼容 Page transition，移除 visibility style
 */

import { forwardRef, cloneElement, useRef } from 'react'
import { Transition } from 'react-transition-group'
import tw from 'twin.macro'

import { Status } from '@/constants/components/transition'

// hooks
import useForkRef from '@/hooks/useForkRef'

// types
import type { FadeProps } from '@/types/components/fade'

const Fade: React.ForwardRefRenderFunction<HTMLDivElement, FadeProps> = (props: FadeProps, ref) => {
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
    timeout = 300,
    ...restProps
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
      {(status: Status, childProps: Object) => {
        const isEntered = status === Status.entered
        return cloneElement(children, {
          style: {
            ...tw`transition-opacity`,
            opacity: isEntered ? 1 : 0,
            transitionDuration: `${timeout}ms`,
            ...children.props.style
          },
          ref: handleRef,
          ...restProps,
          ...childProps
        })
      }}
    </Transition>
  )
}

export default forwardRef(Fade)
