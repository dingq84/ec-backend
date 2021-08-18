import { Either } from 'fp-ts/lib/Either'

import { ITokenDTO } from '@/auth/domains/dto/TokenDTO'
import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'

export interface ITokenRepository {
  login(parameters: { account: string; password: string }): Promise<Either<IErrorDTO, ITokenDTO>>
  logout(): Promise<Either<IErrorDTO, void>>
  refreshToken(): Promise<Either<IErrorDTO, ITokenDTO>>
  getRefreshToken(): Promise<string | null>
  setRefreshToken(accessToken: string, refreshToken: string): void
  removeRefreshToken(): void
  getAccessToken(): string
}
