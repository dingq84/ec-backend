/**
 * @author Dean Chen 2021-06-09
 * 將頁面轉換的動畫獨立出來，原因為原本寫在 layout 裡面，但是不同 layout 轉換就會沒動畫，
 * 另外 TransitionGroup 會給子層額外的 properties，像是 in、enter、exit 等等，
 * 但因為子層 Fade 不會存取這些 properties，所以會直接添加在 Fade 的 第一個 DOM，因此透過 childFactory
 * 將多的屬性添加給 Fade 本身; 除此之外，在 children 外新增一個 div 提供給 Fade 掛載 ref，
 * 避免 children 需額外設定 forwardRef
 * TODO: testing
 */

import { useRouter } from 'next/router'
import { createElement } from 'react'
import { TransitionGroup } from 'react-transition-group'
import 'twin.macro'

// components
import Fade from '@/components/shared/fade'

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

function PageTransition(props: PageTransitionProps) {
  const router = useRouter()
  const { className = '', children } = props
  return (
    <TransitionGroup
      className={className}
      childFactory={child => {
        const { in: inProps, onExited, ...restProps } = child.props
        return (
          <Fade inProps={inProps} key={router.pathname} appear={false} onExited={onExited}>
            <div tw="w-full h-full">
              {createElement(child.type, {
                ...restProps
              })}
            </div>
          </Fade>
        )
      }}
    >
      {children}
    </TransitionGroup>
  )
}

export default PageTransition
