import { StatusCode } from '@/common/constants/statusCode'

export interface IErrorInputPort {
  statusCode: StatusCode
  statusMessage: string
  data?: unknown
}

export interface IErrorOutputPort {
  readonly statusCode: StatusCode
  // api 錯誤訊息
  readonly statusMessage: string
  readonly data?: unknown
  // view 顯示的錯誤訊息
  readonly errorMessage: string
}
