import ErrorPresenter from '@/common/adapter/ErrorPresenter'
import { StatusCode } from '@/common/constants/statusCode'

class AdminErrorPresenter extends ErrorPresenter {
  convertErrorToViewMessage(statusCode: StatusCode): string {
    switch (statusCode) {
      case StatusCode.parameterRequired:
        return '必填欄位為空，請填寫完畢再送出'
      case StatusCode.adminNameOnlyChinese:
        return '必填欄位格式錯誤，請填寫正確再送出'
      case StatusCode.wrongAdminNameLength:
        return '管理者名稱超過字數限制，上限為十字，請重新填寫'
      case StatusCode.accountIsExist:
        return '此帳號已存在，請重新填寫'
      case StatusCode.emptyPassword:
        return '未填寫必填欄位，欲進行下一步請填寫完畢'
      case StatusCode.wrongAdminId:
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

export default AdminErrorPresenter
