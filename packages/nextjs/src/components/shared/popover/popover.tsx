/**
 * @author Dean Chen 2021-04-16
 * @link https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/Popover/Popover.js
 * 程式碼參考 Material-UI，完成最基本的 popover 功能，
 * 原本的 grow transition 改成使用 backdrop 自帶的 fade transition
 *
 * @modified
 * [Ding.Chen-2021-06-23]: 新增根據 anchor 的寬度計算 paper width，並透過 autoWidth 控制是否啟動
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
import type { ModalProps } from '@/components/shared/modal'

// utils
import getOffsetTop from '@/utils/components/popover/getOffsetTop'
import getOffsetLeft from '@/utils/components/popover/getOffsetLeft'
import getTransformOriginValue from '@/utils/components/popover/getTransformOriginValue'

export interface PopoverProps extends ModalProps {
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
  autoWidth?: boolean // 自動計算 paper width
  paperProps?: {
    css: TwStyle[]
  }
}

const Popover = forwardRef<HTMLDivElement, PopoverProps>(function Popover(
  props: PopoverProps,
  ref
) {
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
    autoWidth = true,
    paperProps = { css: [] },
    ...restProps
  } = props
  const paperRef = useRef<HTMLDivElement>(null!)
  const getAnchorOffset = useCallback(() => {
    // nodeType 1 為 Element，如果沒傳入 anchor element，則使用 body
    const anchorElement =
      anchorEl && anchorEl.nodeType === 1 ? anchorEl : paperRef.current.ownerDocument.body
    const anchorRect = anchorElement.getBoundingClientRect()

    return {
      top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
      left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal),
      width: anchorRect.width
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
    (
      element: HTMLElement
    ): Pick<CSSStyleDeclaration, 'top' | 'left' | 'transformOrigin' | 'width'> => {
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

      // Calculate paper width
      const width = `${anchorOffset.width}px`

      return { top, left, width, transformOrigin: getTransformOriginValue(elemTransformOrigin) }
    },
    [anchorEl, getAnchorOffset]
  )

  const setPositioningStyles = useCallback(() => {
    const element = paperRef.current
    if (!element) {
      return
    }

    const { top, left, width, transformOrigin } = getPositioningStyle(element)
    if (top !== null) {
      element.style.top = top
    }
    if (left !== null) {
      element.style.left = left
    }

    if (autoWidth) {
      element.style.width = width
    }

    element.style.transformOrigin = transformOrigin
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
})

export default Popover
