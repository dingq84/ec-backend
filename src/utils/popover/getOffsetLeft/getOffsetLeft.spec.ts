// types
import type { HorizontalType } from '@/types/popover'

// utils
import getOffsetLeft from '.'

describe('testing getOffsetLeft', () => {
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
    const horizon: HorizontalType = 'left'
    expect(getOffsetLeft(rect, horizon)).toBe(0)
  })

  it('should return width when horizon equals right', () => {
    const horizon: HorizontalType = 'right'
    expect(getOffsetLeft(rect, horizon)).toBe(rect.width)
  })

  it('should return the half of width when horizon equals center', () => {
    const horizon: HorizontalType = 'center'
    expect(getOffsetLeft(rect, horizon)).toBe(rect.width / 2)
  })

  it('should return horizon when horizon equals number', () => {
    const horizon: HorizontalType = 999
    expect(getOffsetLeft(rect, horizon)).toBe(horizon)
  })
})
