/**
 * @author Ding.Chen 2021-06-22
 * 新增 Date picker，使用 react-datepicker，底層是 date-fns
 */

import { useState } from 'react'
import ReactDatePicker, { registerLocale, ReactDatePickerProps } from 'react-datepicker'
import zhTw from 'date-fns/locale/zh-TW'

// components
import TextField from '@/components/shared/textField'

// styles
import 'react-datepicker/dist/react-datepicker.css'

registerLocale('tw', zhTw)

export type DatePickerProps = Omit<ReactDatePickerProps, 'onChange'>

const DatePicker: React.FC<DatePickerProps> = (props: DatePickerProps) => {
  const [date, setDate] = useState<Date>()
  const handleChange = (date: Date) => {
    setDate(date)
  }

  return (
    <ReactDatePicker
      calendarClassName="rasta-stripes"
      locale="tw"
      dateFormat="yyyy/MM/dd"
      selected={date}
      onChange={handleChange}
      customInput={<TextField onClear={() => setDate(undefined)} />}
      {...props}
    />
  )
}

export default DatePicker
