import { ILoginInputPort } from '@/auth/application/interface/iLoginUseCase'
import { ITokenData, ITokenEntity } from '@/auth/domain/interface/iToken'
import { IErrorInputPort } from '@/common/application/interface/iErrorUseCase'
import Validator from '@/common/domain/Validator'
import { StatusCode } from '@/common/constants/statusCode'

class TokenEntity implements ITokenEntity {
  private readonly _accessToken: string
  private readonly _refreshToken: string

  constructor(parameters: ITokenData) {
    this._accessToken = parameters.accessToken
    this._refreshToken = parameters.refreshToken
  }

  get accessToken(): string {
    return this._accessToken
  }

  get refreshToken(): string {
    return this._refreshToken
  }

  static loginValidate(parameters: ILoginInputPort): IErrorInputPort | true {
    const { account, password } = parameters
    if (Validator.isStringEmpty(account) || Validator.isStringEmpty(password)) {
      const statusMessage = '帳號或密碼不能為空值'
      return {
        statusCode: StatusCode.emptyAccountOrPassword,
        statusMessage,
        data: {
          account: statusMessage,
          password: statusMessage
        }
      }
    }

    if (Validator.isEmail(account) === false) {
      const statusMessage = '帳號需為 Email 格式'
      return {
        statusCode: StatusCode.wrongAccountFormat,
        statusMessage,
        data: {
          account: statusMessage,
          password: statusMessage
        }
      }
    }

    return true
  }

  static refreshTokenValidate(parameters: { refreshToken: string | null }): IErrorInputPort | true {
    const { refreshToken } = parameters
    if (!Validator.isString(refreshToken) || Validator.isStringEmpty(refreshToken as string)) {
      return {
        statusCode: StatusCode.tokenCancel,
        statusMessage: '請重新登入'
      }
    }

    return true
  }
}

export default TokenEntity
