import { forwardRef, useCallback, useRef } from 'react'
import 'twin.macro'

// components
import Modal from '@/components/common/modal'
import Paper from '@/components/common/paper'

// types
import { TransitionProps } from '@/types/transition'

function getAnchorEl(anchorEl?: () => HTMLElement | HTMLElement) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl
}

function getOffsetTop(rect: DOMRect, vertical: verticalType) {
  switch (vertical) {
    case 'center':
      return rect.height / 2
    case 'bottom':
      return rect.height
    case 'top':
      return 0
    default:
      return vertical
  }
}

function getOffsetLeft(rect: DOMRect, horizontal: horizontalType) {
  switch (horizontal) {
    case 'center':
      return rect.width / 2
    case 'right':
      return rect.height
    case 'left':
      return 0
    default:
      return horizontal
  }
}

function getTransformOriginValue(transformOrigin: {
  horizontal: horizontalType
  vertical: verticalType
}) {
  return [transformOrigin.horizontal, transformOrigin.vertical]
    .map(n => (typeof n === 'number' ? `${n}px` : n))
    .join(' ')
}

type horizontalType = 'center' | 'left' | 'right' | number
type verticalType = 'center' | 'top' | 'bottom' | number
type PopoverProps = TransitionProps & {
  isOpen: boolean // 控制 popover 開關
  anchorEl?: HTMLDivElement // 錨點 決定 popover 要定位在哪裡
  children: React.ReactNode
  anchorOrigin?: {
    // 錨點的 origin
    horizontal: horizontalType
    vertical: verticalType
  }
  transformOrigin?: {
    // 決定 popover 的 origin
    horizontal: horizontalType
    vertical: verticalType
  }
  onClose?: Function // 開關 popover
  horizontalSpace?: number // 錨點和 popover 的水平間距
  verticalSpace?: number // 錨點和 popover 的垂直間距
}

const Popover: React.ForwardRefRenderFunction<HTMLDivElement, PopoverProps> = (
  props: PopoverProps,
  ref
) => {
  const {
    isOpen,
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
    ...restProps
  } = props
  const paperRef = useRef<HTMLDivElement>(null)

  const getAnchorOffset = useCallback(() => {
    const resolvedAnchorEl = getAnchorEl(anchorEl)
    // nodeType 1 為 Element，如果沒傳入 anchor element，則使用 body
    const anchorElement =
      resolvedAnchorEl && resolvedAnchorEl.nodeType === 1
        ? resolvedAnchorEl
        : paperRef.current?.ownerDocument.body

    const anchorRect = anchorElement!.getBoundingClientRect()

    return {
      top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
      left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal)
    }
  }, [anchorEl, getAnchorEl])

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

  return (
    <Modal
      open={isOpen}
      ref={ref}
      onBackdropClick={onClose}
      backdropProps={{
        invisible: true,
        appear: true,
        onEntering: handleEntering
      }}
      {...restProps}
    >
      <Paper
        ref={paperRef}
        tw="absolute overflow-y-auto overflow-x-hidden outline-none min-width[16px] min-height[16px]"
      >
        {children}
      </Paper>
    </Modal>
  )
}

export default forwardRef(Popover)
