import { useEffect } from 'react'

// utils
import debounce from '@/utils/debounce'

type useResizeProps = {
  handler: Function
} & ({ wait: number; isDebounced: true } | { wait?: undefined; isDebounced?: boolean })

function useResize(props: useResizeProps) {
  const { handler, isDebounced = true, wait = 166 } = props

  useEffect(() => {
    const handleResize = isDebounced ? debounce(() => handler(), wait) : () => handler()

    window.addEventListener('resize', handleResize)

    return () => {
      // TODO: handleResize 的 型別定義應該可以迴避掉 as 的用法
      if (isDebounced) {
        ;(handleResize as ReturnType<typeof debounce>).clear()
      }

      window.removeEventListener('resize', handleResize)
    }
  })
}

export default useResize
