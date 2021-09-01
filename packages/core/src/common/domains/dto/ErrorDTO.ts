import { StatusCode } from '@/common/constants/statusCode'

export interface IErrorParameters {
  statusCode: StatusCode
  statusMessage: string
  data?: unknown
}

export interface IErrorDTO {
  readonly statusCode: StatusCode
  // api 錯誤訊息
  readonly statusMessage: string
  readonly data: unknown
  // view 顯示的錯誤訊息
  readonly errorMessage: string
}

class ErrorDTO implements IErrorDTO {
  readonly statusCode: StatusCode
  readonly statusMessage: string
  readonly data: unknown

  constructor(parameters: IErrorParameters) {
    const { statusCode, statusMessage, data = null } = parameters
    this.data = data
    this.statusCode = statusCode
    this.statusMessage = statusMessage
  }

  get errorMessage(): string {
    return this.convertErrorToViewMessage()
  }

  protected convertErrorToViewMessage(): string {
    switch (this.statusCode) {
      case StatusCode.success:
        return '成功'
      case StatusCode.accountFrozen:
        return '此帳號遭停權/凍結，請聯絡您的管理者協助處理。'
      case StatusCode.tokenCancel:
        return '請先登入'
      case StatusCode.tokenExpire:
        return '登入已經過期，請重新登入'
      case StatusCode.unauthorized:
        return '無法完成此項目操作因為您沒有所需的權限'
      case StatusCode.system:
        return '系統繁忙中 請稍後再試'
      case StatusCode.parameter:
        return '參數錯誤，請重新填寫'
      default:
        return '系統繁忙中 請稍後再試'
    }
  }
}

export default ErrorDTO
