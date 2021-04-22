// utils
import debounce from '.'

describe('testing debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  it('should debounce', () => {
    const mockFn = jest.fn()
    const expectedContext = { foo: 'bar' }
    let actualContext: typeof expectedContext | null = null
    function collectContext(this: typeof expectedContext, ...args: any[]) {
      actualContext = this
      mockFn(...args)
    }

    const debounced = debounce(collectContext)
    debounced.apply(expectedContext, ['a', 'b'])
    expect(mockFn).not.toHaveBeenCalled()

    jest.runAllTimers()

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn.mock.calls[0]).toEqual(['a', 'b'])
    expect(actualContext).toMatchObject(expectedContext)
  })

  it('should clear a pending task', () => {
    const mockFn = jest.fn()
    const debounced = debounce(mockFn)
    debounced()
    expect(mockFn).not.toHaveBeenCalled()
    debounced.clear()
    jest.runAllTimers()
    expect(mockFn).not.toHaveBeenCalled()
  })
})
