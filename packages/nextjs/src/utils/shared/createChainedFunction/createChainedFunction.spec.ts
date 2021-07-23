import createChainedFunction from '.'

describe('test createChainedFunction', () => {
  it('should receive same arguments for every function', () => {
    const a = jest.fn()
    const b = jest.fn()
    const c = jest.fn()
    const chainedFunction = createChainedFunction(a, b, c)

    chainedFunction(3, 7, 5, 4)

    expect(a.mock.calls[0]).toEqual([3, 7, 5, 4])
    expect(b.mock.calls[0]).toEqual([3, 7, 5, 4])
    expect(c.mock.calls[0]).toEqual([3, 7, 5, 4])
  })

  it('should remove arguments that are not a function', () => {
    const a = jest.fn()
    const b = null
    const c = null
    const chainedFunction = createChainedFunction(a, b, c)

    chainedFunction(3, 7, 5, 4)
    expect(a.mock.calls[0]).toEqual([3, 7, 5, 4])
  })
})
