import getKey from '.'

describe('testing getKey', () => {
  it('should return "1-2-3" ', () => {
    const previousKey = ''
    const currentKey = '1-2-3'
    expect(getKey(previousKey, currentKey)).toBe(currentKey)
  })

  it('should return "0-1-2-3-4 ', () => {
    const previousKey = '0-1-2'
    const currentKey = '3'
    expect(getKey(previousKey, currentKey)).toBe('0-1-2-3')
  })
})
