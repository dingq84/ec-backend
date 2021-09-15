import { IErrorInputPort } from '@/common/application/interface/iErrorUseCase'
import { StatusCode } from '@/common/constants/statusCode'
import { IUpdatePasswordInputPort } from '@/admin/application/interface/iUpdatePasswordUseCase'
import Validator from '@/common/domain/Validator'
import { IAccountData, IAccountEntity } from '@/admin/domain/interface/iAccountEntity'

class AccountEntity implements IAccountEntity {
  private readonly _id: number
  private readonly _name: string
  private readonly _account: string

  constructor(
    parameters: Pick<IAccountData, 'id' | 'name'> & Partial<Exclude<IAccountData, 'id' | 'name'>>
  ) {
    this._id = parameters.id
    this._name = parameters.name
    this._account = parameters.account || ''
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

  static updatePasswordValidate(parameters: IUpdatePasswordInputPort): IErrorInputPort | true {
    const { accountId, oldPassword, newPassword1, newPassword2 } = parameters

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
