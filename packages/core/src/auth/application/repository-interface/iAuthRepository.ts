import { Either } from 'fp-ts/lib/Either'

import { ITokenEntity } from '@/auth/domain/interface/iToken'
import { IMeEntity } from '@/auth/domain/interface/iMe'
import { IErrorInputPort } from '@/common/application/interface/iErrorUseCase'

export interface IAuthRepositoryParameters {
  login: {
    account: string
    password: string
  }
  refreshToken: {
    refreshToken: string
  }
}

export interface IAuthRepository {
  login(data: IAuthRepositoryParameters['login']): Promise<Either<IErrorInputPort, ITokenEntity>>
  logout(): Promise<Either<IErrorInputPort, void>>
  refreshToken(
    data: IAuthRepositoryParameters['refreshToken']
  ): Promise<Either<IErrorInputPort, ITokenEntity>>
  getRefreshToken(): Promise<string | null>
  setRefreshToken(accessToken: string, refreshToken: string): void
  removeRefreshToken(): void
  getAccessToken(): string
  getMe(): Promise<Either<IErrorInputPort, IMeEntity>>
}
