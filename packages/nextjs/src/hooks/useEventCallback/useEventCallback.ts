/**
 * @author Dean Chen 2021-04-16
 * @link https://github.com/facebook/react/issues/14099#issuecomment-440013892
 * The problem is that we often want to avoid invalidating a callback
 * (e.g. to preserve shallow equality below or to avoid re-subscriptions in the effects).
 * But if it depends on props or state, it's likely it'll invalidate too often.
 */

import { useCallback, useRef } from 'react'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

export default function useEventCallback<Args extends unknown[], Return>(
  fn: (...args: Args) => Return
): (...args: Args) => Return {
  const ref = useRef(fn)
  useEnhancedEffect(() => {
    ref.current = fn
  })
  // @ts-expect-error hide `this`
  return useCallback((...args: Args) => (0, ref.current!)(...args), [])
}
