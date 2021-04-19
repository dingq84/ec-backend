import { useState, useEffect } from 'react'

function useResize() {
  const [isMobile, setIsMobile] = useState(true)

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsMobile(false)
    } else {
      setIsMobile(true)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  return isMobile
}

export default useResize
