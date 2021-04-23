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
