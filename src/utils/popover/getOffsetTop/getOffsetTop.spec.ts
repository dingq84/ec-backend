// types
import type { VerticalType } from '@/types/popover'

// utils
import getOffsetTop from '.'

describe('testing getOffsetTop', () => {
  const rect: DOMRect = {
    width: 100,
    height: 200,
    x: 300,
    y: 400,
    top: 500,
    left: 600,
    right: 700,
    bottom: 800,
    toJSON() {}
  }

  it('should return 0 when horizon equals left ', () => {
    const vertical: VerticalType = 'top'
    expect(getOffsetTop(rect, vertical)).toBe(0)
  })

  it('should return height when vertical equals right', () => {
    const vertical: VerticalType = 'bottom'
    expect(getOffsetTop(rect, vertical)).toBe(rect.height)
  })

  it('should return the half of height when vertical equals center', () => {
    const vertical: VerticalType = 'center'
    expect(getOffsetTop(rect, vertical)).toBe(rect.height / 2)
  })

  it('should return vertical when vertical equals number', () => {
    const vertical: VerticalType = 999
    expect(getOffsetTop(rect, vertical)).toBe(vertical)
  })
})
