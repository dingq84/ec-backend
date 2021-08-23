import { Either, left } from 'fp-ts/lib/Either'
import Joi from 'joi'

import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'
import { StatusCode } from '@/common/constants/statusCode'
import { IAccountUseCase } from '@/admin/domains/useCases/interfaces/IAccount'
import AccountErrorDTO from '@/admin/domains/dto/AccountErrorDTO'
import AccountDTO, { IAccountParameters } from '@/admin/domains/dto/AccountDTO'
import { IAccountPresenter } from './interfaces/IAccount'

class AccountPresenter implements IAccountPresenter {
  constructor(private readonly useCases: IAccountUseCase) {}

  async updatePassword(parameters: IAccountParameters): Promise<Either<IErrorDTO, void>> {
    const { oldPassword, newPassword1, newPassword2 } = parameters

    if (newPassword1 !== newPassword2) {
      const statusMessage = '新密碼與再次輸入的新密碼需一致。'
      return left(
        new AccountErrorDTO({
          statusCode: StatusCode.passwordIsNotSame,
          statusMessage,
          data: {
            newPassword1: statusMessage,
            newPassword2: statusMessage
          }
        })
      )
    }

    if (oldPassword === newPassword1) {
      const statusMessage = '舊密碼與新密碼必須不一致。'
      return left(
        new AccountErrorDTO({
          statusCode: StatusCode.newPasswordIsSameAsOldPassword,
          statusMessage,
          data: {
            oldPassword: statusMessage,
            newPassword1: statusMessage,
            newPassword2: statusMessage
          }
        })
      )
    }

    const schema = Joi.string()
      .regex(/^[a-zA-Z0-9]+$/)
      .regex(/\d/)
      .regex(/[a-z]/i)
      .min(6)
      .max(12)
    const validResult = schema.validate(newPassword1)

    if (validResult.error) {
      const statusMessage = '密碼格式錯誤，請重新輸入。'
      return left(
        new AccountErrorDTO({
          statusCode: StatusCode.wrongPasswordFormat,
          statusMessage,
          data: {
            newPassword1: statusMessage,
            newPassword2: statusMessage
          }
        })
      )
    }

    return await this.useCases.updatePassword(new AccountDTO(parameters))
  }
}

export default AccountPresenter
