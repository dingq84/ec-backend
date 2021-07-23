// types
import type { HorizontalType } from '@/types/components/popover'

function getOffsetLeft(rect: DOMRect, horizontal: HorizontalType) {
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
