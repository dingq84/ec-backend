import isFormData from '.'

describe('test isFormData', () => {
  it('should be false when method equals get', () => {
    expect(isFormData({ method: 'get' })).toBe(false)
  })

  it('should be false when method equals GET', () => {
    expect(isFormData({ method: 'GET' })).toBe(false)
  })

  it('should be false when there is no headers', () => {
    expect(isFormData({ method: 'POST' })).toBe(false)
  })

  it('should be false when Content-Type equal json', () => {
    expect(isFormData({ headers: { 'Content-Type': 'application.json' } })).toBe(false)
  })

  it('should be false when Content-Type equal multipart/form-data and method equal get', () => {
    expect(isFormData({ headers: { 'Content-Type': 'multipart/form-data' } })).toBe(false)
  })

  it('should be false when Content-Type equal multipart/form-data and method does not equal get', () => {
    expect(isFormData({ headers: { 'Content-Type': 'multipart/form-data' }, method: 'PUT' })).toBe(
      true
    )
  })
})
