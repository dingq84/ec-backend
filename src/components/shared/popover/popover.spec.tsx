import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

// components
import Popover from '.'

describe('test popover', () => {
  describe('test render', () => {
    it('should render nothing when open equals false', () => {
      const { container } = render(<Popover open={false} />)
      expect(container).toBeEmptyDOMElement()
    })

    it('should render "hello world" when open equals true', () => {
      const { queryByTestId } = render(
        <Popover open>
          <h1 data-testid="popover">hello world</h1>
        </Popover>
      )
      expect(queryByTestId('popover')).toHaveTextContent('hello world')
    })
  })

  describe('test position', () => {
    const anchor = document.createElement('div')
    const width = 100
    const height = 200

    anchor.getBoundingClientRect = () => ({
      width,
      height,
      top: 300,
      left: 400,
      right: 500,
      bottom: 600,
      x: 700,
      y: 800,
      toJSON() {}
    })

    it('paper inline style should equal { top: "500px", left: "400px", transformOrigin: "0px 0px" } when default ', () => {
      const { queryByTestId } = render(<Popover anchorEl={anchor} open />)
      const paper = queryByTestId('paper')
      const { style } = paper!
      expect(style.top).toBe('500px')
      expect(style.left).toBe('400px')
      expect(style.transformOrigin).toBe('0px 0px')
    })

    it(`paper inline style should equal { top: "300px", left: "450px", transformOrigin: "0px 0px"}
       when anchorOrigin equals { vertical: "top", horizontal: "center" } `, () => {
      const { queryByTestId } = render(
        <Popover anchorEl={anchor} open anchorOrigin={{ vertical: 'top', horizontal: 'center' }} />
      )
      const paper = queryByTestId('paper')
      const { style } = paper!
      expect(style.top).toBe('300px')
      expect(style.left).toBe('450px')
      expect(style.transformOrigin).toBe('0px 0px')
    })

    it(`paper inline style should equal { top: "400px", left: "480px", transformOrigin: "20px 100px"}
       when anchorOrigin equals { vertical: "center", horizontal: "right" } 
       and transformOrigin equals { vertical: center, horizontal: 0 } `, () => {
      const { queryByTestId } = render(
        <Popover
          anchorEl={anchor}
          open
          anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
          transformOrigin={{ vertical: 'center', horizontal: 20 }}
        />
      )

      const paper = queryByTestId('paper')
      // 這邊有一個 issue，因為 jest 尚未支持 layout，所以 offsetWidth、offsetHeight 都會等於 0
      // 詳情可參考此 issue https://github.com/testing-library/react-testing-library/issues/353
      // 因此測不出預定 transformOrigin = "20px 100px"，而是 "20px 0px"
      const { style } = paper!
      expect(style.top).toBe('400px')
      expect(style.left).toBe('480px')
      expect(style.transformOrigin).toBe('20px 0px')
    })

    it('paper inline style should equal { top: "500px", left: "410px", transformOrigin: "0px 0px" } when horizontal space equals 10 ', () => {
      const { queryByTestId } = render(<Popover anchorEl={anchor} open horizontalSpace={10} />)
      const paper = queryByTestId('paper')
      const { style } = paper!
      expect(style.top).toBe('500px')
      expect(style.left).toBe('410px')
      expect(style.transformOrigin).toBe('0px 0px')
    })

    it('paper inline style should equal { top: "520px", left: "400px", transformOrigin: "0px 0px" } when vertical space equals 20 ', () => {
      const { queryByTestId } = render(<Popover anchorEl={anchor} open verticalSpace={20} />)
      const paper = queryByTestId('paper')
      const { style } = paper!
      expect(style.top).toBe('520px')
      expect(style.left).toBe('400px')
      expect(style.transformOrigin).toBe('0px 0px')
    })
  })

  describe('test transition functions', () => {
    it('should execute onEnter when popover is opened', () => {
      const mockFn = jest.fn()
      render(<Popover open backdropProps={{ onEnter: mockFn }} />)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })
  })
})
