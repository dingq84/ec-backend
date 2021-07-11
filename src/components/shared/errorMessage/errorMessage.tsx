/**
 * @author Ding.Chen 2021-07-11
 * 將 input 的錯誤訊息拉出來獨立一個元件，提供給專案全局錯誤訊息使用
 */

import 'twin.macro'

// components
import Collapse from '@/components/shared/collapse'

export interface ErrorMessage {
  collapse?: boolean // 是否擁有動畫
  show?: boolean // 是否顯示錯誤訊息，如果 collapse
  message?: string
}

const ErrorMessage = (props: ErrorMessage) => {
  const { collapse = true, show = false, message = '' } = props
  const inProps = !collapse || show

  return (
    <Collapse inProps={inProps}>
      <span tw="inline-block ml-1 h-3 leading-none text-red-500 text-xs">{message}</span>
    </Collapse>
  )
}

export default ErrorMessage
