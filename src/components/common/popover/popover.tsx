/**
 * @author Dean Chen 2021-04-16
 * @link https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Popover/Popover.js
 * 程式碼參考 Material-UI，完成最基本的 popover 功能，
 * 原本的 grow transition 改成使用 backdrop 自帶的 fade transition
 */

import { forwardRef, useCallback, useRef } from 'react'
import 'twin.macro'

// components
import Modal from '@/components/common/modal'
import Paper from '@/components/common/paper'

// hooks
import useResize from '@/hooks/useResize'

// types
import type { TwStyle } from 'twin.macro'
import type { TransitionProps } from '@/types/transition'
import type { BasicComponentProps } from '@/types/next'
import type { HorizontalType, VerticalType } from '@/types/popover'

// utils
import getOffsetTop from '@/utils/popover/getOffsetTop'
import getOffsetLeft from '@/utils/popover/getOffsetLeft'
import getTransformOriginValue from '@/utils/popover/getTransformOriginValue'

type PopoverProps = TransitionProps &
  BasicComponentProps & {
    inProps: boolean // 控制 popover 開關
    anchorEl?: HTMLDivElement // 錨點 決定 popover 要定位在哪裡
    anchorOrigin?: {
      // 錨點的 origin
      horizontal: HorizontalType
      vertical: VerticalType
    }
    transformOrigin?: {
      // 決定 popover 的 origin
      horizontal: HorizontalType
      vertical: VerticalType
    }
    onClose?: Function // 開關 popover
    horizontalSpace?: number // 錨點和 popover 的水平間距
    verticalSpace?: number // 錨點和 popover 的垂直間距
    hiddenBackdrop?: boolean // 隱藏 backdrop
    paperProps?: {
      css: TwStyle[]
    }
  }

const Popover: React.ForwardRefRenderFunction<HTMLDivElement, PopoverProps> = (
  props: PopoverProps,
  ref
) => {
  const {
    inProps,
    children,
    anchorEl,
    anchorOrigin = {
      vertical: 'bottom',
      horizontal: 'left'
    },
    transformOrigin = {
      vertical: 'top',
      horizontal: 'left'
    },
    onEntering,
    onClose,
    horizontalSpace = 0,
    verticalSpace = 0,
    hiddenBackdrop = false,
    paperProps,
    ...restProps
  } = props
  const paperRef = useRef<HTMLDivElement>(null)
  const getAnchorOffset = useCallback(() => {
    // nodeType 1 為 Element，如果沒傳入 anchor element，則使用 body
    const anchorElement =
      anchorEl && anchorEl.nodeType === 1 ? anchorEl : paperRef.current?.ownerDocument.body

    const anchorRect = anchorElement!.getBoundingClientRect()

    return {
      top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
      left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal)
    }
  }, [anchorEl])

  // Returns the base transform origin using the element
  const getTransformOrigin = useCallback(
    elemRect => {
      return {
        vertical: getOffsetTop(elemRect, transformOrigin.vertical),
        horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal)
      }
    },
    [transformOrigin.horizontal, transformOrigin.vertical]
  )

  const getPositioningStyle = useCallback(
    (element: HTMLElement): Pick<CSSStyleDeclaration, 'top' | 'left' | 'transformOrigin'> => {
      const elemRect = {
        width: element.offsetWidth,
        height: element.offsetHeight
      }

      // Get the transform origin point on the element itself
      const elemTransformOrigin = getTransformOrigin(elemRect)
      const anchorOffset = getAnchorOffset()
      // Calculate element positioning
      let top = `${anchorOffset.top - elemTransformOrigin.vertical + verticalSpace}px`
      let left = `${anchorOffset.left - elemTransformOrigin.horizontal + horizontalSpace}px`

      return { top, left, transformOrigin: getTransformOriginValue(elemTransformOrigin) }
    },
    [anchorEl, getAnchorOffset]
  )

  const setPositioningStyles = useCallback(() => {
    const element = paperRef.current
    if (!element) {
      return
    }

    const positioning = getPositioningStyle(element)
    if (positioning.top !== null) {
      element.style.top = positioning.top
    }
    if (positioning.left !== null) {
      element.style.left = positioning.left
    }

    element.style.transformOrigin = positioning.transformOrigin
  }, [getPositioningStyle])

  const handleEntering = (node: HTMLElement, isAppearing: any) => {
    if (onEntering) {
      onEntering(node, isAppearing)
    }

    setPositioningStyles()
  }

  useResize({ handler: setPositioningStyles, isDebounced: false })

  return (
    <Modal
      open={inProps}
      ref={ref}
      onBackdropClick={onClose}
      backdropProps={{
        invisible: true,
        hidden: hiddenBackdrop,
        appear: true,
        onEntering: handleEntering
      }}
      {...restProps}
    >
      <Paper
        ref={paperRef}
        tw="absolute transition-all overflow-y-auto overflow-x-hidden outline-none min-width[16px] min-height[16px]"
        css={paperProps?.css}
        data-testid="paper"
      >
        {children}
      </Paper>
    </Modal>
  )
}

export default forwardRef(Popover)
