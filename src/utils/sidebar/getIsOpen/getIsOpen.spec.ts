// utils
import getIsOpen from '.'

describe('testing getIsOpen', () => {
  it('should return false, when the item key does not include the prefix of the active key, or the length of item key is greater than the active key', () => {
    const activeKey = '0-0-3'
    const itemKey1 = '0-1'
    const itemKey2 = '0-2'
    const itemKey3 = '1-0'
    const itemKey4 = '0-0-3-2'

    expect(getIsOpen(itemKey1, activeKey)).toBe(false)
    expect(getIsOpen(itemKey2, activeKey)).toBe(false)
    expect(getIsOpen(itemKey3, activeKey)).toBe(false)
    expect(getIsOpen(itemKey4, activeKey)).toBe(false)
  })

  it('should return true when the item key includes the prefix of the active key and the length of the item key is lesser than the active key', () => {
    const activeKey = '0-0-3'
    const itemKey1 = '0-0'
    const itemKey2 = '0'
    const itemKey3 = '0-0-3'

    expect(getIsOpen(itemKey1, activeKey)).toBe(true)
    expect(getIsOpen(itemKey2, activeKey)).toBe(true)
    expect(getIsOpen(itemKey3, activeKey)).toBe(true)
    expect(getIsOpen(itemKey1, activeKey)).toBe(true)
  })
})
