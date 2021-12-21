import { useState, useRef } from 'react'
import ReactDatePicker, {
  registerLocale,
  ReactDatePickerProps,
  CalendarContainer
} from 'react-datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import zhTw from 'date-fns/locale/zh-TW'
import { getMonth, getYear, format } from 'date-fns'
import tw, { css } from 'twin.macro'

// components
import Select from '@/components/shared/select'
import TextField from '@/components/shared/textField'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// styles
import 'react-datepicker/dist/react-datepicker.css'

// types
import type { TextFieldProps } from '@/components/shared/textField'

registerLocale('tw', zhTw)

const containerCss = css`
  & .react-datepicker__month-container {
    ${tw`float-none px-11 flex-grow flex flex-col`}

    & .react-datepicker__header {
      ${tw`bg-white pt-6 flex-shrink-0 border-none`}

      & .react-datepicker__day-names {
        font-size: 15px;
        ${tw`w-full flex justify-between`}

        & .react-datepicker__day-name {
          ${tw`text-base text-primary font-normal m-0`}
        }
      }
    }

    & .react-datepicker__month {
      ${tw`flex-grow flex flex-col justify-between m-0 mt-2.5`}

      & .react-datepicker__week {
        ${tw`w-full flex justify-between`}

        & .react-datepicker__day {
          ${tw`text-base text-gray-4 font-normal m-0 hover:(text-purple-1 bg-white)`}
        }

        & .react-datepicker__day--keyboard-selected {
          ${tw`bg-transparent`}
        }

        & .react-datepicker__day--selected,
        .react-datepicker__day--today {
          ${tw`bg-primary text-white rounded-full`}
        }

        & .react-datepicker__day--disabled {
          ${tw`text-gray-5 pointer-events-none`}
        }
      }
    }
  }
`

export interface CalenderProps {
  className: string
  children: React.ReactChild[]
  submit: () => void
}

const CustomCalendar = (props: CalenderProps) => {
  const { className, children, submit } = props
  return (
    <div tw="w-[375px] h-[375px]">
      <CalendarContainer className={className} tw="w-full h-full">
        <div tw="relative w-full h-full flex flex-col border-none" css={[containerCss]}>
          {children}
          <div tw="flex-shrink-0 py-5" className="flex-center">
            <button className="btn-outline" tw="flex-shrink-0" onClick={submit}>
              確定
            </button>
          </div>
        </div>
      </CalendarContainer>
    </div>
  )
}

export interface DatePickerProps extends Omit<ReactDatePickerProps, 'onChange' | 'value'> {
  onChange?: (date: string) => void
  value: string
  inputProps?: Omit<TextFieldProps, 'onClear'>
  startYear?: number
}

const DatePicker = (props: DatePickerProps) => {
  const { onChange, value, inputProps, startYear = 1990, ...restProps } = props
  const [date, setDate] = useState<Date>()
  const [open, setOpen] = useState(false)
  const isYearSelecting = useRef(false)
  const currentYear = getYear(new Date())
  const years = [...Array(currentYear - startYear + 1).keys()].map(index => {
    const year = (index + startYear).toString()
    return {
      key: year,
      value: year
    }
  })

  useEnhancedEffect(() => {
    if (value !== '') {
      try {
        const valueByDate = new Date(value)
        setDate(valueByDate)
      } catch (error) {
        console.error(error)
      }
    }
  }, [value])

  const handleChange = (date: Date) => {
    setDate(date)
  }

  const handleYearsChange = (value: string, changeYear: (_: number) => void): void => {
    isYearSelecting.current = true
    changeYear(Number(value))
  }

  const submit = (): void => {
    setOpen(false)
    if (onChange && date) {
      const dateByString = format(date, 'yyyy-MM-dd')
      onChange(dateByString)
    }
  }
  return (
    <ReactDatePicker
      locale="tw"
      showPopperArrow={false}
      open={open}
      dateFormat="yyyy/MM/dd"
      selected={date}
      minDate={new Date()}
      onChange={handleChange}
      onCalendarOpen={(): void => {
        setOpen(true)
      }}
      onClickOutside={(): void => {
        setTimeout(() => {
          if (isYearSelecting.current) {
            isYearSelecting.current = false
            return
          }

          setOpen(false)
        }, 0)
      }}
      calendarContainer={(props: CalenderProps) => <CustomCalendar {...props} submit={submit} />}
      renderCustomHeader={({ date, decreaseMonth, increaseMonth, changeYear }) => (
        <div tw="bg-white">
          <Select
            value={getYear(date).toString()}
            options={years}
            onChange={value => handleYearsChange(value, changeYear)}
            inputProps={{ clear: false }}
            onClick={() => (isYearSelecting.current = true)}
            onClose={() => (isYearSelecting.current = false)}
          />
          <span tw="text-primary font-semibold text-lg block">{getYear(date)}</span>
          <div tw="flex justify-between pb-5">
            <button className="btn-text" tw="ml-2.5" onClick={decreaseMonth}>
              <FontAwesomeIcon icon={faChevronLeft} tw="text-xs text-primary" />
            </button>
            <span tw="text-black font-semibold text-lg">{getMonth(date)}</span>
            <button className="btn-text" tw="mr-2.5" onClick={increaseMonth}>
              <FontAwesomeIcon icon={faChevronRight} tw="text-xs text-primary" />
            </button>
          </div>
        </div>
      )}
      customInput={<TextField {...inputProps} value={''} onClear={() => setDate(undefined)} />}
      {...restProps}
    />
  )
}

export default DatePicker
