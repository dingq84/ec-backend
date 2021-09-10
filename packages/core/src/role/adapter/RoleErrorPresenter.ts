import ErrorPresenter from '@/common/adapter/ErrorPresenter'
import { StatusCode } from '@/common/constants/statusCode'

class RoleErrorPresenter extends ErrorPresenter {
  convertErrorToViewMessage(statusCode: StatusCode): string {
    switch (statusCode) {
      case StatusCode.wrongRoleStatus:
        return '狀態變更只能為啟用、停用或刪除'
      case StatusCode.wrongRoleId:
        return '角色 id 需為數字'
      case StatusCode.roleIsNotExist:
        return '角色不存在'
      case StatusCode.roleCanNotUpdate:
        return '角色無法被編輯或刪除'
      case StatusCode.wrongRoleNameFormat:
        return '角色名稱不得超過10個字。'
      case StatusCode.permissionIsEmpty:
        return '角色名稱不得為空'
      case StatusCode.roleNameIsExist:
        return '角色名稱不得重複'
      default:
        return super.convertErrorToViewMessage(statusCode)
    }
  }
}

export default RoleErrorPresenter
