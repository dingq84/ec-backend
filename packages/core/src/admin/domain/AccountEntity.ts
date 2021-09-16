import { IErrorInputPort } from '@/common/application/interface/iErrorUseCase'
import { StatusCode } from '@/common/constants/statusCode'
import { IUpdatePasswordInputPort } from '@/admin/application/interface/iUpdatePasswordUseCase'
import Validator from '@/common/domain/Validator'
import { IAccountData, IAccountEntity } from '@/admin/domain/interface/iAccountEntity'
import { IRoleEntity } from '@/role/domain/interface/iRoleEntity'
import { Status } from '@/common/constants/status'

class AccountEntity implements IAccountEntity {
  private readonly _id: number
  private readonly _name: string
  private readonly _account: string
  private readonly _status: Status
  private readonly _createdAt: string
  private readonly _updatedAt: string
  private readonly _roles: Array<Pick<IRoleEntity, 'id' | 'name'>>

  constructor(
    parameters: Pick<IAccountData, 'id' | 'name'> & Partial<Exclude<IAccountData, 'id' | 'name'>>
  ) {
    this._id = parameters.id
    this._name = parameters.name
    this._account = parameters.account || ''
    this._status = parameters.status || Status.active
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

    if (oldPassword === '' && newPassword1 === '' && newPassword2 === '') {
      return {
        statusCode: StatusCode.emptyPassword,
        statusMessage: '必填欄位未填寫'
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
}

export default AccountEntity
