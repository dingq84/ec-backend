import ErrorPresenter from '@/common/adapter/ErrorPresenter'
import { StatusCode } from '@/common/constants/statusCode'

class AccountErrorPresenter extends ErrorPresenter {
  convertErrorToViewMessage(statusCode: StatusCode): string {
    switch (statusCode) {
      case StatusCode.wrongAccountId:
        return '帳號 id 格式錯誤'
      case StatusCode.wrongPasswordFormat:
        return '密碼格式錯誤，請重新輸入。'
      case StatusCode.passwordIsNotSame:
        return '新密碼與再次輸入的新密碼需一致。'
      case StatusCode.newPasswordIsSameAsOldPassword:
        return '舊密碼與新密碼必須不一致。'
      case StatusCode.wrongPassword:
        return '舊密碼並不符合此帳號的現有密碼。'
      default:
        return super.convertErrorToViewMessage(statusCode)
    }
  }
}

export default AccountErrorPresenter
