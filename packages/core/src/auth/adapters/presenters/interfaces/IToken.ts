import { Either } from 'fp-ts/lib/Either'

import { DataError } from '@/common/types/DataError'

export interface ITokenPresenter {
  login(parameters: { account: string; password: string }): Promise<Either<DataError, string>>
  logout(): Promise<Either<DataError, void>>
  refreshToken(): Promise<Either<DataError, string>>
  getRefreshToken(): Promise<string | null>
  getAccessToken(): string
}
