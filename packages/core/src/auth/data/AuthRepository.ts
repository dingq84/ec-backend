import { either } from 'fp-ts'
import { flow } from 'fp-ts/lib/function'
import { Either } from 'fp-ts/lib/Either'

import { IAuthRepository } from '@/auth/application/repository-interface/iAuthRepository'
import { ILoginInputPort } from '@/auth/application/interface/iLoginUseCase'
import TokenEntity from '@/auth/domain/TokenEntity'
import { ITokenData, ITokenEntity } from '@/auth/domain/interface/iToken'
import { IHttpInfrastructure, ResponseResult } from '@/common/adapter/interface/iHttpInfrastructure'
import { IStorageInfrastructure } from '@/common/adapter/interface/iStorageInfrastructure'
import { IErrorInputPort } from '@/common/application/interface/iErrorUseCase'
import { ApiUrl } from '@/common/constants/api'
import { IMeData, IMeEntity } from '../domain/interface/iMe'
import MeEntity from '../domain/MeEntity'

class AuthRepository implements IAuthRepository {
  constructor(
    private readonly http: IHttpInfrastructure,
    private readonly storage: IStorageInfrastructure
  ) {}

  async login(parameter: ILoginInputPort): Promise<Either<IErrorInputPort, ITokenEntity>> {
    const result = await this.http.request<ITokenData>({
      url: ApiUrl.login,
      method: 'POST',
      data: parameter
    })

    return flow(
      either.map((response: ResponseResult<ITokenData>) => new TokenEntity(response.data))
    )(result)
  }

  async logout(): Promise<Either<IErrorInputPort, void>> {
    const result = await this.http.request<void>({
      method: 'POST',
      url: ApiUrl.logout,
      withAuth: true
    })

    return flow(either.map((response: ResponseResult<void>) => response.data))(result)
  }

  async refreshToken(): Promise<Either<IErrorInputPort, ITokenEntity>> {
    const refreshToken = await this.getRefreshToken()
    const result = await this.http.request<ITokenData>({
      method: 'POST',
      url: ApiUrl.refreshToken,
      headers: {
        Authorization: refreshToken
      }
    })

    return flow(
      either.map((response: ResponseResult<ITokenData>) => new TokenEntity(response.data))
    )(result)
  }

  async getMe(): Promise<Either<IErrorInputPort, IMeEntity>> {
    const result = await this.http.request<IMeData>({
      url: ApiUrl.me,
      method: 'GET',
      withAuth: true
    })

    return flow(either.map((response: ResponseResult<IMeData>) => new MeEntity(response.data)))(
      result
    )
  }

  async getRefreshToken(): Promise<string | null> {
    return await this.storage.get('refreshToken')
  }

  setRefreshToken(accessToken: string, refreshToken: string): void {
    this.storage.set('refreshToken', refreshToken)
    this.http.token = accessToken
  }

  removeRefreshToken(): void {
    this.storage.remove('refreshToken')
    this.http.token = ''
  }

  getAccessToken(): string {
    return this.http.token
  }
}

export default AuthRepository
