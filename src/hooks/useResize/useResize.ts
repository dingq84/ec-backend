import { useState, useEffect } from 'react'

function useResize() {
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsMobile(false)
    } else {
      setIsMobile(true)
    }
  }

  useEffect(() => {
    handleResize()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  return isMobile
}

export default useResize
