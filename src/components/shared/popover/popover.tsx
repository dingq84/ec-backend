/**
 * @author Dean Chen 2021-04-16
 * @link https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Popover/Popover.js
 * 程式碼參考 Material-UI，完成最基本的 popover 功能，
 * 原本的 grow transition 改成使用 backdrop 自帶的 fade transition
 */

import { forwardRef, useCallback, useRef } from 'react'
import { TwStyle } from 'twin.macro'

// components
import Modal from '@/components/shared/modal'
import Paper from '@/components/shared/paper'

// hooks
import useResize from '@/hooks/useResize'

// types
import type { HorizontalType, VerticalType } from '@/types/components/popover'
import type { ModalProps } from '@/types/components/modal'

// utils
import getOffsetTop from '@/utils/components/popover/getOffsetTop'
import getOffsetLeft from '@/utils/components/popover/getOffsetLeft'
import getTransformOriginValue from '@/utils/components/popover/getTransformOriginValue'

type PopoverProps = ModalProps & {
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
    open,
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
    horizontalSpace = 0,
    verticalSpace = 0,
    hiddenBackdrop = false,
    backdropProps = {},
    paperProps = { css: [] },
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
    if (backdropProps.onEntering) {
      backdropProps.onEntering(node, isAppearing)
    }

    setPositioningStyles()
  }

  useResize({ handler: setPositioningStyles, isDebounced: false })

  return (
    <Modal
      open={open}
      ref={ref}
      backdropProps={{
        invisible: true,
        hidden: hiddenBackdrop,
        appear: true,
        onEntering: handleEntering,
        ...backdropProps
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
