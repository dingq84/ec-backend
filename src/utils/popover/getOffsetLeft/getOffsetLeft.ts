// types
import type { horizontalType } from '@/types/popover'

function getOffsetLeft(rect: DOMRect, horizontal: horizontalType) {
  switch (horizontal) {
    case 'center':
      return rect.width / 2
    case 'right':
      return rect.width
    case 'left':
      return 0
    default:
      return horizontal
  }
}

export default getOffsetLeft
