import { StatusCode } from '@/common/constants/statusCode'
import ErrorDTO from '@/common/domains/dto/ErrorDTO'

class RoleErrorDTO extends ErrorDTO {
  convertErrorToViewMessage(): string {
    switch (this.statusCode) {
      case StatusCode.wrongStatus:
        return '狀態變更只能為啟用或停用'
      case StatusCode.roleIsNotExist:
        return '角色不存在'
      case StatusCode.roleCanNotUpdate:
        return '角色無法被編輯或刪除'
      default:
        return super.convertErrorToViewMessage()
    }
  }
}

export default RoleErrorDTO
