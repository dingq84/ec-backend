import '@testing-library/jest-dom'

// utils
import createFormData from '.'

describe('test createFormData', () => {
  const mockConsoleError = jest.fn()

  beforeAll(() => {
    jest.spyOn(global.console, 'error').mockImplementation(mockConsoleError)
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('should get Form Data when data type Array<[string, string]>', () => {
    const data: [string, unknown][] = [
      ['a', '1'],
      ['b', '2'],
      ['c', '3']
    ]
    const formData = createFormData(data)
    expect(formData.get('a')).toEqual('1')
    expect(formData.get('b')).toBe('2')
    expect(formData.get('c')).toBe('3')
  })

  it('should get Form Data when data type Array<[string, Blob]>', () => {
    const blob = new Blob()
    const data: [string, unknown][] = [
      ['a', blob],
      ['b', blob],
      ['c', blob]
    ]
    const formData = createFormData(data)
    expect(formData.get('a')).toMatchObject(blob)
    expect(formData.get('b')).toMatchObject(blob)
    expect(formData.get('c')).toMatchObject(blob)
  })

  it('should get Form Data when data type Array<[string, string[]]>', () => {
    const data: [string, unknown][] = [
      ['a', ['1', '2', '3']],
      ['b', '2'],
      ['c', '3']
    ]
    const formData = createFormData(data)
    expect(formData.getAll('a')).toEqual(['1', '2', '3'])
    expect(formData.get('b')).toBe('2')
    expect(formData.get('c')).toBe('3')
  })

  it('should get Form Data when data type Array<[string, Blob[]]>', () => {
    const blob = new Blob()
    const data: [string, unknown][] = [
      ['a', [blob, blob, blob, blob]],
      ['b', blob],
      ['c', blob]
    ]
    const formData = createFormData(data)
    expect(formData.getAll('a')).toHaveLength(4)
    expect(formData.get('b')).toMatchObject(blob)
    expect(formData.get('c')).toMatchObject(blob)
  })

  it('should not get "a" value if the a value is number', () => {
    const data: [string, unknown][] = [
      ['a', 2],
      ['b', '2'],
      ['c', '3']
    ]
    const formData = createFormData(data)
    expect(mockConsoleError).toHaveBeenCalledTimes(1)
    expect(formData.get('a')).toBeNull()
    expect(formData.get('b')).toBe('2')
    expect(formData.get('c')).toBe('3')
  })

  it('should not get "a" value if the a value is boolean', () => {
    const data: [string, unknown][] = [
      ['a', false],
      ['b', '2'],
      ['c', '3']
    ]
    const formData = createFormData(data)
    expect(mockConsoleError).toHaveBeenCalledTimes(1)
    expect(formData.get('a')).toBeNull()
    expect(formData.get('b')).toBe('2')
    expect(formData.get('c')).toBe('3')
  })
})
