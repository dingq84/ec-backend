import getPreviousKey from '.'

describe('test getPreviousKey', () => {
  it('should return "0-0-1"', () => {
    const itemKey = '0-0-1-2'
    expect(getPreviousKey(itemKey)).toBe('0-0-1')
  })

  it('should return "0"', () => {
    const itemKey = '0-4'
    expect(getPreviousKey(itemKey)).toBe('0')
  })

  it('should return "1-2-3-5-7"', () => {
    const itemKey = '1-2-3-5-7-9'
    expect(getPreviousKey(itemKey)).toBe('1-2-3-5-7')
  })

  it('should return ""', () => {
    const itemKey = '0'
    expect(getPreviousKey(itemKey)).toBe('')
  })
})
