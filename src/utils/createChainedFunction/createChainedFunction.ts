/**
 * @author Dean Chen 2021-04-16
 * @link https://github.com/mui-org/material-ui/blob/next/packages/material-ui-utils/src/createChainedFunction.js
 * Safe chained function.
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 */

function createChainedFunction(...funcs: Array<Function | null>): Function {
  return funcs.reduce(
    (acc: Function, func) => {
      if (func == null) {
        return acc
      }

      return function chainedFunction(this: void) {
        acc.apply(this, arguments)
        func.apply(this, arguments)
      }
    },
    () => {}
  )
}

export default createChainedFunction
