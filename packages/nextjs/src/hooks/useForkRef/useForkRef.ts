/**
 * @author Dean Chen 2021-04-10
 * @link https://github.com/mui-org/material-ui/blob/next/packages/material-ui-utils/src/useForkRef.ts
 * useForkRef 是為了實作 Collapse 而從 Material-UI clone 下來，
 * 主要作用是當自定義 component 內部需要 ref 使用，而又接受外部傳入 ref，
 * 兩個 ref 都要掛在同一個 element 或是 variable ，就可以透過 useForkRef 去達到，
 * 同時把目標的狀態更新到兩個 ref 上
 */

import { useMemo } from 'react'

// utils
import setRef from '@/utils/shared/setRef'

function useForkRef<Instance>(
  refA: React.Ref<Instance> | null | undefined,
  refB: React.Ref<Instance> | null | undefined
): React.Ref<Instance> | null {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior.
   */
  return useMemo(() => {
    if (refA == null && refB == null) {
      return null
    }
    return refValue => {
      setRef(refA, refValue)
      setRef(refB, refValue)
    }
  }, [refA, refB])
}

export default useForkRef
