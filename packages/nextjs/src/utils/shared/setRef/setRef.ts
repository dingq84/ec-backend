/**
 * @author Dean Chen 2021-04-10
 * @link https://github.com/mui-org/material-ui/blob/next/packages/material-ui-utils/src/setRef.ts
 * setRef 是為了實作 Collapse 而從 Material-UI clone 下來，
 * 主要作用是當要把 ref 曝露到外部時，對他進行一層包裝，達到一定的控制
 */

function setRef<T>(
  ref: React.MutableRefObject<T | null> | ((instance: T | null) => void) | null | undefined,
  value: T | null
): void {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    ref.current = value
  }
}

export default setRef
