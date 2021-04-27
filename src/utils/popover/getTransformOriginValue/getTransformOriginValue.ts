import type { HorizontalType, VerticalType } from '@/types/popover'

function getTransformOriginValue(transformOrigin: {
  horizontal: HorizontalType
  vertical: VerticalType
}) {
  return [transformOrigin.horizontal, transformOrigin.vertical]
    .map(n => (typeof n === 'number' ? `${n}px` : n))
    .join(' ')
}

export default getTransformOriginValue
