import { either } from 'fp-ts'
import { Either } from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'

import { IErrorInputPort, IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { StatusCode } from '@/common/constants/statusCode'
import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'

class ErrorPresenter implements IErrorPresenter {
  protected convertErrorToViewMessage(statusCode: StatusCode): string {
    switch (statusCode) {
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
      default:
        return '系統繁忙中 請稍後再試'
    }
  }

  present<T>(data: Either<IErrorInputPort, T>): Either<IErrorOutputPort, T> {
    return flow((data: Either<IErrorInputPort, T>) =>
      either.mapLeft((error: IErrorInputPort) => ({
        ...error,
        errorMessage: this.convertErrorToViewMessage(error.statusCode)
      }))<T>(data)
    )(data)
  }
}

export default ErrorPresenter
