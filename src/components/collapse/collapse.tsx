/**
 * @author Dean Chen 2021-04-09
 * @link https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Collapse/Collapse.js
 * Collapse 主要是為了達成需要伸縮動畫的地方，像是 Sidebar，至於 Drawer 請參考 Slide，
 * 大部分邏輯借鏡 Material-UI 的 Collapse，刪減部分功能，並修復一些問題，
 * 如 Material 的垂直向是透過 Height 控制，但在實作伸縮的縮 Transition 沒有奏效，
 * 因此改良成 Max-height
 */
import { forwardRef, useRef } from 'react'
import { Transition } from 'react-transition-group'
import tw from 'twin.macro'

// utils
import useForkRef from '../../hooks/useForkRef'

enum STATUS {
  entering = 'entering',
  entered = 'entered',
  exiting = 'exiting',
  exited = 'exited'
}

type CollapseProps = {
  inProps: boolean
  children: React.ReactNode
  timeout?: number
  orientation?: 'horizontal' | 'vertical'
  collapsedSize?: string
  onEnter?: Function
  onEntering?: Function
  onEntered?: Function
  onExit?: Function
  onExiting?: Function
  onExited?: Function
}

const Collapse = forwardRef<HTMLDivElement, CollapseProps>(function Collapse(
  props: CollapseProps,
  ref
): JSX.Element {
  const {
    orientation = 'vertical',
    collapsedSize = '0px',
    timeout = 500,
    inProps,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    children
  } = props
  const nodeRef = useRef<HTMLDivElement>(null) // 控制 Transition component
  const handleRef = useForkRef<HTMLDivElement>(ref, nodeRef) // 這邊可將外部傳入的 ref 和這邊需要的 ref 合併成一個，可同時運作
  const wrapperRef = useRef<HTMLDivElement>(null) // 控制 Wrapper component，用來控制橫向伸縮的 position
  const isHorizontal = orientation === 'horizontal'
  const size = isHorizontal ? 'width' : 'maxHeight'

  const getWrapperSize = () =>
    wrapperRef.current![isHorizontal ? 'clientWidth' : 'clientHeight'] || 0

  const normalizedTransitionCallback = (callback?: Function) => (maybeIsAppearing?: any) => {
    if (callback) {
      const node = nodeRef.current
      // onEnterXxx and onExitXxx callbacks have a different arguments.length value.
      if (maybeIsAppearing === undefined) {
        callback(node)
      } else {
        callback(node, maybeIsAppearing)
      }
    }
  }

  const handleEnter = normalizedTransitionCallback((node: HTMLElement, isAppearing: any) => {
    if (wrapperRef.current && isHorizontal) {
      // Set absolute position to get the size of collapsed content
      wrapperRef.current.style.position = 'absolute'
    }
    node.style[size] = collapsedSize

    if (onEnter) {
      onEnter(node, isAppearing)
    }
  })

  const handleEntering = normalizedTransitionCallback((node: HTMLElement, isAppearing: any) => {
    const wrapperSize = getWrapperSize()

    if (wrapperRef.current && isHorizontal) {
      // After the size is read reset the position back to default
      wrapperRef.current.style.position = 'static'
    }
    node.style.transitionDuration = `${timeout}ms`
    node.style[size] = `${wrapperSize}px`

    if (onEntering) {
      onEntering(node, isAppearing)
    }
  })

  const handleEntered = normalizedTransitionCallback((node: HTMLElement, isAppearing: any) => {
    if (isHorizontal) {
      node.style[size] = '100%' // 因為 width auto 的動畫效果不如預期，改良為 100%
    } else {
      node.style[size] = 'auto'
    }

    if (onEntered) {
      onEntered(node, isAppearing)
    }
  })

  const handleExit = normalizedTransitionCallback((node: HTMLElement): void => {
    node.style[size] = `${getWrapperSize()}px`

    if (onExit) {
      onExit(node)
    }
  })

  const handleExited = normalizedTransitionCallback(onExited)

  const handleExiting = normalizedTransitionCallback((node: HTMLElement) => {
    node.style.transitionDuration = `${timeout}ms`
    node.style[size] = collapsedSize
    if (onExiting) {
      onExiting(node)
    }
  })

  return (
    <Transition
      in={inProps}
      timeout={timeout}
      nodeRef={nodeRef}
      onEnter={handleEnter}
      onEntered={handleEntered}
      onEntering={handleEntering}
      onExit={handleExit}
      onExited={handleExited}
      onExiting={handleExiting}
    >
      {(status: STATUS) => (
        <div
          ref={handleRef}
          role="root"
          css={[
            tw`overflow-hidden transition-timing-function[cubic-bezier(0.4, 0, 0.2, 1)] transition-delay[0ms]`,
            orientation === 'horizontal' && tw`w-0 transition-property[width]`,
            orientation === 'vertical' && tw`max-h-0 transition-property[max-height]`,
            status === STATUS.entered && tw`overflow-visible`,
            status === STATUS.exited && tw`invisible`
          ]}
          style={{ [isHorizontal ? 'minWidth' : 'minHeight']: collapsedSize }}
        >
          <div tw="flex w-full" role="wrapper" ref={wrapperRef}>
            <div tw="w-full" role="inner">
              {children}
            </div>
          </div>
        </div>
      )}
    </Transition>
  )
})

export default Collapse
