/**
 * @author Ding.Chen 2021-07-11
 * 建立所有 input components 通用的型別，像是 Checkbox、Radio、Select 和 TextField 等等
 */

import { HTMLAttributes } from 'react'

interface InputBasicType<T> extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
  id?: string
  label?: string
  name?: string
  value?: T
  onChange?: (value: T) => void
  error?: boolean // 是否有錯誤
  errorMessage?: string // 錯誤訊息
  disabled?: boolean
  readOnly?: boolean
  labelPosition?: 'top' | 'left'
}

interface Option {
  key: string
  value: string
}

export type { InputBasicType, Option }
