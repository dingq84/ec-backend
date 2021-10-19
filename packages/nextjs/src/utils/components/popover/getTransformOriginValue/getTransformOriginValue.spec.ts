import getTransformOriginValue from '.'

describe('test getTransformOriginValue', () => {
  it('should return "10px 10px" when transformOriginValue equals { horizontal: 10, vertical: 10 }', () => {
    expect(getTransformOriginValue({ horizontal: 10, vertical: 10 })).toBe('10px 10px')
  })

  it('should return "center 10px" when transformOriginValue equals { horizontal: "center", vertical: 10 }', () => {
    expect(getTransformOriginValue({ horizontal: 'center', vertical: 10 })).toBe('center 10px')
  })

  it('should return "20px top" when transformOriginValue equals { horizontal: 20px, vertical: "top" }', () => {
    expect(getTransformOriginValue({ horizontal: 20, vertical: 'top' })).toBe('20px top')
  })

  it('should return "left bottom" when transformOriginValue equals { horizontal: "left", vertical: "bottom" }', () => {
    expect(getTransformOriginValue({ horizontal: 'left', vertical: 'bottom' })).toBe('left bottom')
  })
})
