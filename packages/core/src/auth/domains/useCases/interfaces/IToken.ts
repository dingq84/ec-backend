import { Either } from 'fp-ts/lib/Either'

import { DataError } from '@/common/types/DataError'

export interface ITokenUseCase {
  login(parameters: { account: string; password: string }): Promise<Either<DataError, string>>
  refreshToken(): Promise<Either<DataError, string>>
  logout(): Promise<Either<DataError, void>>
  getRefreshToken(): Promise<string | null>
  getAccessToken(): string
}
