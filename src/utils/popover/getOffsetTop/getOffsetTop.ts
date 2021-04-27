// types
import type { VerticalType } from '@/types/popover'

function getOffsetTop(rect: DOMRect, vertical: VerticalType) {
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

export default getOffsetTop
