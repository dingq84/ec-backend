interface InputBasicType<T> {
  id?: string
  label?: string
  name?: string
  value: T
  onChange: (value: T) => void
  error?: boolean // 是否有錯誤
  disabled?: boolean
  readOnly?: boolean
  labelPosition?: 'top' | 'left'
}

interface Option {
  key: string
  value: string
}

export type { InputBasicType, Option }
