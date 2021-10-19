import { format } from 'date-fns'

import { IFormatPresenter } from '@/common/adapter/interface/iFormatPresenter'

class FormatPresenter implements IFormatPresenter {
  formatStringDate(date: string): string {
    return format(new Date(date), 'yyyy/MM/dd')
  }
}

export default FormatPresenter
