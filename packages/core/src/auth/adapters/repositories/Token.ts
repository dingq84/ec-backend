/**
 * @author Ding.Chen 2021-07-29
 * 根據 use cases layer 的 repositories interfaces 實作出 Token 的操作
 */

import { either } from 'fp-ts'
import { flow } from 'fp-ts/lib/function'
import { Either, left } from 'fp-ts/lib/Either'

import TokenDTO, { ITokenDTO, ITokenParameters } from '@/auth/domains/dto/TokenDTO'
import { IHttp, ResponseResult } from '@/common/adapters/infrastructures/interfaces/IHttp'
import { IStorage } from '@/common/adapters/infrastructures/interfaces/IStorage'
import { ITokenRepository } from '@/auth/domains/useCases/repositories-interfaces/IToken'
import { DataError, ErrorTypes } from '@/common/types/DataError'

class TokenRepository implements ITokenRepository {
  constructor(private readonly storage: IStorage, private readonly http: IHttp) {}

  async login(parameters: {
    account: string
    password: string
  }): Promise<Either<DataError, ITokenDTO>> {
    const { account, password } = parameters
    const result = await this.http.request<ITokenParameters>({
      method: 'POST',
      url: '/auth/login',
      data: {
        account,
        password
      }
    })

    return flow(
      either.map((response: ResponseResult<ITokenParameters>) => new TokenDTO(response.data))
    )(result)
  }

  async logout(): Promise<Either<DataError, void>> {
    const result = await this.http.request<void>({
      method: 'POST',
      url: '/auth/logout',
      withAuth: true
    })

    return flow(either.map((response: ResponseResult<void>) => response.data))(result)
  }

  async refreshToken(): Promise<Either<DataError, ITokenDTO>> {
    const refreshToken = await this.storage.get('token')

    if (refreshToken === null) {
      return left({ kind: ErrorTypes.authenticated })
    }

    const result = await this.http.request<ITokenParameters>({
      method: 'POST',
      url: '/auth/refreshToken',
      data: {
        refreshToken
      }
    })
    return flow(
      either.map((response: ResponseResult<ITokenParameters>) => new TokenDTO(response.data))
    )(result)
  }

  setToken(accessToken: string, refreshToken: string): void {
    this.storage.set('token', refreshToken)
    this.http.storeToken(accessToken)
  }

  removeToken(): void {
    this.storage.remove('token')
    this.http.storeToken('')
  }
}

export default TokenRepository
