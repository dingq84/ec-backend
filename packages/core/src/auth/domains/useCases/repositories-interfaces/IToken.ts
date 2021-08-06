import { Either } from 'fp-ts/lib/Either'

import { ITokenDTO } from '@/auth/domains/dto/TokenDTO'
import { DataError } from '@/common/types/DataError'

export interface ITokenRepository {
  login(parameters: { account: string; password: string }): Promise<Either<DataError, ITokenDTO>>
  logout(): Promise<Either<DataError, void>>
  refreshToken(): Promise<Either<DataError, ITokenDTO>>
  getRefreshToken(): Promise<string | null>
  setRefreshToken(accessToken: string, refreshToken: string): void
  removeRefreshToken(): void
  getAccessToken(): string
}
