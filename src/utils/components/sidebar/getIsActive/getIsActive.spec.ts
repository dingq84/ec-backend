// utils
import getIsActive from '.'

describe('test getIsActive', () => {
  it('should return true when item key equals to active key', () => {
    const activeKey = '0-0-3'
    const itemKey = '0-0-3'
    expect(getIsActive(itemKey, activeKey)).toBe(true)
  })

  it('should return false when item key does not equal to active key', () => {
    const activeKey = '0-0-3'
    const itemKey = '0-0-4'
    expect(getIsActive(itemKey, activeKey)).toBe(false)
  })
})
