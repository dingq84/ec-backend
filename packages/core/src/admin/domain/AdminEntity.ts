import { IErrorInputPort } from '@/common/application/interface/iErrorUseCase'
import { StatusCode } from '@/common/constants/statusCode'
import { IUpdatePasswordInputPort } from '@/admin/application/interface/iUpdatePasswordUseCase'
import Validator from '@/common/domain/Validator'
import { IAdminData, IAdminEntity } from '@/admin/domain/interface/iAdminEntity'
import { IRoleEntity } from '@/role/domain/interface/iRoleEntity'
import { Status } from '@/common/constants/status'
import { ICreateAdminInputPort } from '@/admin/application/interface/iCreateAdminUseCase'
import { IUpdateAdminInputPort } from '@/admin/application/interface/iUpdateAdminUseCase'

class AdminEntity implements IAdminEntity {
  private readonly _id: number
  private readonly _name: string
  private readonly _account: string
  private readonly _status: Status
  private readonly _createdAt: string
  private readonly _updatedAt: string
  private readonly _roles: Array<Pick<IRoleEntity, 'id' | 'name'>>

  constructor(
    parameters: Pick<IAdminData, 'id' | 'name'> & Partial<Exclude<IAdminData, 'id' | 'name'>>
  ) {
    this._id = parameters.id
    this._name = parameters.name
    this._account = parameters.account || ''
    this._status = parameters.status === undefined ? Status.active : parameters.status
    this._createdAt = parameters.createdAt || ''
    this._updatedAt = parameters.updatedAt || ''
    this._roles = parameters.roles || []
  }

  get id(): number {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get account(): string {
    return this._account
  }

  get status(): Status {
    return this._status
  }

  get createdAt(): string {
    return this._createdAt
  }

  get updatedAt(): string {
    return this._updatedAt
  }

  get roles(): Array<Pick<IRoleEntity, 'id' | 'name'>> {
    return this._roles
  }

  static updatePasswordValidate(parameters: IUpdatePasswordInputPort): IErrorInputPort | true {
    const { accountId, oldPassword, newPassword1, newPassword2 } = parameters

    if (oldPassword === '' || newPassword1 === '' || newPassword2 === '') {
      const statusMessage = '必填欄位未填寫'
      return {
        statusCode: StatusCode.emptyPassword,
        statusMessage,
        data: {
          oldPassword: statusMessage,
          newPassword1: statusMessage,
          newPassword2: statusMessage
        }
      }
    }

    if (!Validator.isNumber(accountId)) {
      return {
        statusCode: StatusCode.passwordIsNotSame,
        statusMessage: '帳號 id 錯誤'
      }
    }

    if (newPassword1 !== newPassword2) {
      const statusMessage = '新密碼與再次輸入的新密碼需一致。'
      return {
        statusCode: StatusCode.passwordIsNotSame,
        statusMessage,
        data: {
          newPassword1: statusMessage,
          newPassword2: statusMessage
        }
      }
    }

    if (oldPassword === newPassword1) {
      const statusMessage = '舊密碼與新密碼必須不一致。'
      return {
        statusCode: StatusCode.newPasswordIsSameAsOldPassword,
        statusMessage,
        data: {
          oldPassword: statusMessage,
          newPassword1: statusMessage,
          newPassword2: statusMessage
        }
      }
    }

    if (!Validator.isPasswordFormat(newPassword1)) {
      const statusMessage = '密碼格式錯誤，請重新輸入。'
      return {
        statusCode: StatusCode.wrongPasswordFormat,
        statusMessage,
        data: {
          newPassword1: statusMessage,
          newPassword2: statusMessage
        }
      }
    }

    return true
  }

  static createAdminValidate(parameters: ICreateAdminInputPort): IErrorInputPort | true {
    const { name, account, password, roleId } = parameters

    if (
      Boolean(name) === false ||
      Boolean(account) === false ||
      Boolean(password) === false ||
      typeof roleId !== 'number'
    ) {
      const statusMessage = '必填欄位為空，請填寫完畢再送出'
      return {
        statusCode: StatusCode.parameterRequired,
        statusMessage,
        data: {
          name: statusMessage,
          account: statusMessage,
          password: statusMessage,
          roleId: statusMessage
        }
      }
    }

    if (name.length > 10) {
      const statusMessage = '管理者名稱超過字數限制，上限為十字，請重新填寫'
      return {
        statusCode: StatusCode.wrongAdminNameLength,
        statusMessage,
        data: {
          name: statusMessage
        }
      }
    }

    if (Validator.isChineseCharacters(name) === false) {
      const statusMessage = '必填欄位格式錯誤，請填寫正確再送出'
      return {
        statusCode: StatusCode.adminNameOnlyChinese,
        statusMessage,
        data: {
          name: statusMessage
        }
      }
    }

    return true
  }

  static updateAdminValidate(parameters: IUpdateAdminInputPort): IErrorInputPort | true {
    const { name, account, roleId } = parameters

    if (Boolean(name) === false || Boolean(account) === false || typeof roleId !== 'number') {
      const statusMessage = '必填欄位為空，請填寫完畢再送出'
      return {
        statusCode: StatusCode.parameterRequired,
        statusMessage,
        data: {
          name: statusMessage,
          account: statusMessage,
          roleId: statusMessage
        }
      }
    }

    if (name.length > 10) {
      const statusMessage = '管理者名稱超過字數限制，上限為十字，請重新填寫'
      return {
        statusCode: StatusCode.wrongAdminNameLength,
        statusMessage,
        data: {
          name: statusMessage
        }
      }
    }

    if (Validator.isChineseCharacters(name) === false) {
      const statusMessage = '必填欄位格式錯誤，請填寫正確再送出'
      return {
        statusCode: StatusCode.adminNameOnlyChinese,
        statusMessage,
        data: {
          name: statusMessage
        }
      }
    }

    return true
  }
}

export default AdminEntity
