import ErrorPresenter from '@/common/adapter/ErrorPresenter'
import { StatusCode } from '@/common/constants/statusCode'

class AuthErrorPresenter extends ErrorPresenter {
  convertErrorToViewMessage(statusCode: StatusCode): string {
    switch (statusCode) {
      case StatusCode.emptyAccountOrPassword:
        return '您的帳號密碼欄位為空，請輸入您的帳號及密碼。'
      case StatusCode.wrongAccountFormat:
        return '帳號格式輸入錯誤，請重新輸入。'
      case StatusCode.wrongAccountOrPassword:
        return '帳號或密碼輸入錯誤，請重新輸入。'
      default:
        return super.convertErrorToViewMessage(statusCode)
    }
  }
}

export default AuthErrorPresenter
