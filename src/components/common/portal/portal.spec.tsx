import { useRef } from 'react'
import { render } from '@testing-library/react'

// components
import Portal from '.'

describe('test portal', () => {
  it('should have access to the mountNode when disabledPortal={false}', () => {
    const refSpy = jest.fn()
    const { unmount } = render(
      <Portal ref={refSpy}>
        <h1>portal</h1>
      </Portal>
    )

    expect(refSpy.mock.calls[0][0]).toEqual(document.body)
    unmount()
    expect(refSpy.mock.calls).toEqual([[document.body], [null]])
  })

  it('should have access to the mountNode when disabledPortal={true}', () => {
    const refSpy = jest.fn()
    const { unmount } = render(
      <Portal disablePortal ref={refSpy}>
        <h1 className="woofPortal">Foo</h1>
      </Portal>
    )
    const mountNode = document.querySelector('.woofPortal')
    expect(refSpy.mock.calls[0][0]).toEqual(mountNode)
    unmount()
    expect(refSpy.mock.calls).toEqual([[mountNode], [null]])
  })

  it('should have access to the mountNode when switching disabledPortal', () => {
    const refSpy = jest.fn()
    const { rerender, unmount } = render(
      <Portal disablePortal ref={refSpy}>
        <h1 className="woofPortal">Foo</h1>
      </Portal>
    )
    const mountNode = document.querySelector('.woofPortal')
    expect(refSpy.mock.calls[0][0]).toEqual(mountNode)

    rerender(
      <Portal ref={refSpy}>
        <h1 className="woofPortal">Foo</h1>
      </Portal>
    )
    expect(refSpy.mock.calls).toEqual([[mountNode], [null], [document.body]])
    unmount()
    expect(refSpy.mock.calls).toEqual([[mountNode], [null], [document.body], [null]])
  })

  it('should render in a different node', () => {
    render(
      <div id="test1">
        <h1 className="woofPortal1">Foo</h1>
        <Portal>
          <h2>hi</h2>
        </Portal>
      </div>
    )
    const rootElement = document.querySelector('#test1')
    expect(rootElement!.contains(document.querySelector('.woofPortal1'))).toBeTruthy()
    expect(rootElement!.contains(document.querySelector('.woofPortal2'))).toBeFalsy()
  })

  it('should unmount when parent unmounted', () => {
    function Child() {
      const containerRef = useRef<HTMLDivElement>(null)

      return (
        <div>
          <div ref={containerRef} />
          <Portal container={() => containerRef.current}>
            <div id="test1" />
          </Portal>
        </div>
      )
    }

    function Parent(props: { show?: boolean }) {
      const { show = true } = props
      return <div>{show ? <Child /> : null}</div>
    }

    const { rerender } = render(<Parent />)
    expect(document.querySelectorAll('#test1').length).toBe(1)

    rerender(<Parent show={false} />)

    expect(document.querySelectorAll('#test1').length).toBe(0)
  })

  it('should render overlay into container (document)', () => {
    render(
      <Portal>
        <div className="test2" />
        <div className="test2" />
      </Portal>
    )
    expect(document.querySelectorAll('.test2').length).toBe(2)
  })

  it('should render overlay into container (DOMNode)', () => {
    const container = document.createElement('div')
    render(
      <Portal container={container}>
        <div id="test2" />
      </Portal>
    )
    expect(container.querySelectorAll('#test2').length).toBe(1)
  })
})
