/**
 * @author Dean Chen 2021-04-13
 * @link https://github.com/mui-org/material-ui/issues/15798
 * React currently throws a warning when using useLayoutEffect on the server.
 * To get around it, we can conditionally useEffect on the server (no-op) and
 * useLayoutEffect in the browser.
 */

import { useLayoutEffect, useEffect } from 'react'
const useEnhancedEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export default useEnhancedEffect
