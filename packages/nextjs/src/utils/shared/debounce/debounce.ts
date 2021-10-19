/**
 * @author Dean Chen 2021-04-22
 * @link https://github.com/mui-org/material-ui/blob/next/packages/material-ui-utils/src/debounce.js
 * debounce 參考 Material-UI，它多了 clear function，用在 component unmounted 的時候清除記憶體，
 * 這是之前沒考量到的，時間設定為 1秒 10 幀，所以 1 / 6 = 166 ms
 */

// Corresponds to 10 frames at 60 Hz.
// A few bytes payload overhead when lodash/debounce is ~3 kB and debounce ~300 B.
export default function debounce(func: Function, wait = 166) {
  let timeout: number
  function debounced(this: any, ...args: any[]) {
    const later = () => {
      func.apply(this, args)
    }
    window.clearTimeout(timeout)
    timeout = window.setTimeout(later, wait)
  }

  debounced.clear = (): void => {
    window.clearTimeout(timeout)
  }

  return debounced
}
