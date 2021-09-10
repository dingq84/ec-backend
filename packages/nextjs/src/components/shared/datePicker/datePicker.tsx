/**
 * @author Ding.Chen 2021-06-22
 * 新增 Date picker，使用 react-datepicker，底層是 date-fns
 */

import { useState } from 'react'
import ReactDatePicker, { registerLocale, ReactDatePickerProps } from 'react-datepicker'
import zhTw from 'date-fns/locale/zh-TW'

// components
// import TextField from '@/components/shared/textField'

// styles
import 'react-datepicker/dist/react-datepicker.css'

// types
import type { TextFieldProps } from '@/components/shared/textField'

registerLocale('tw', zhTw)

export interface DatePickerProps extends Omit<ReactDatePickerProps, 'onChange'> {
  onChange?: (date: Date) => void
  inputProps?: Omit<TextFieldProps, 'onClear'>
}

const DatePicker = (props: DatePickerProps) => {
  const { onChange, inputProps, ...restProps } = props
  const [date, setDate] = useState<Date>()

  const handleChange = (date: Date) => {
    setDate(date)

    if (onChange) {
      onChange(date)
    }
  }

  return (
    <ReactDatePicker
      calendarClassName="rasta-stripes"
      locale="tw"
      dateFormat="yyyy/MM/dd"
      selected={date}
      onChange={handleChange}
      // customInput={<TextField {...inputProps} onClear={() => setDate(undefined)} />}
      {...restProps}
    />
  )
}

export default DatePicker
