// utils
import calculatePagination from '.'

describe('test calculatePagination', () => {
  it('should get [1]', () => {
    expect(calculatePagination(1, 1)).toEqual([1])
  })

  it('should get [1, 2, 3, 4, 5, 6, 7, 8]', () => {
    expect(calculatePagination(1, 8)).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
  })

  it('should get [2, 3, 4, 5, 6, 7, 8, 9, 10]', () => {
    expect(calculatePagination(6, 20)).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it('should get [6, 7, 8, 9, 10, 11, 12, 13, 14]', () => {
    expect(calculatePagination(14, 14)).toEqual([6, 7, 8, 9, 10, 11, 12, 13, 14])
  })
})
