/**
 * @author Dean Chen 2021-04-20
 * useIsMobile 根據螢幕寬度判斷是否是手機裝置，會隨著 resize 時做更新
 */

import { useCallback, useState } from 'react'

// hooks
import useResize from '@/hooks/useResize'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(global.innerWidth < 768)
  const handler = useCallback(() => {
    setIsMobile(global.innerWidth < 768)
  }, [])
  useResize({ handler })

  return isMobile
}

export default useIsMobile
