import { Either, left } from 'fp-ts/lib/Either'
import Joi from 'joi'

import { ITokenPresenter } from '@/auth/adapters/presenters/interfaces/IToken'
import { ITokenUseCase } from '@/auth/domains/useCases/interfaces/IToken'
import TokenErrorDTO from '@/auth/domains/dto/TokenErrorDTO'
import { StatusCode } from '@/common/constants/statusCode'
import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'

class TokenPresenter implements ITokenPresenter {
  constructor(private readonly useCases: ITokenUseCase) {}

  async login(parameters: {
    account: string
    password: string
  }): Promise<Either<IErrorDTO, string>> {
    const { account, password } = parameters

    if (account === '' || password === '') {
      const statusMessage = '帳號或密碼不能為空值'

      return left(
        new TokenErrorDTO({
          statusCode: StatusCode.emptyAccountOrPassword,
          statusMessage,
          data: {
            account: statusMessage,
            password: statusMessage
          }
        })
      )
    }

    const schema = Joi.string().email({ tlds: { allow: false } })
    const validResult = schema.validate(account)

    if (validResult.error) {
      const statusMessage = '帳號需為 Email 格式'
      return left(
        new TokenErrorDTO({
          statusCode: StatusCode.wrongAccountFormat,
          statusMessage,
          data: {
            account: statusMessage,
            password: statusMessage
          }
        })
      )
    }

    return await this.useCases.login(parameters)
  }

  logout(): Promise<Either<IErrorDTO, void>> {
    return this.useCases.logout()
  }

  async refreshToken(): Promise<Either<IErrorDTO, string>> {
    const refresh = await this.getRefreshToken()

    if (refresh === null) {
      return left(
        new TokenErrorDTO({
          statusCode: StatusCode.tokenCancel,
          statusMessage: '請重新登入'
        })
      )
    }

    return await this.useCases.refreshToken()
  }

  getRefreshToken(): Promise<string | null> {
    return this.useCases.getRefreshToken()
  }

  getAccessToken(): string {
    return this.useCases.getAccessToken()
  }
}

export default TokenPresenter
