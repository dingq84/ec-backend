import { Either } from 'fp-ts/lib/Either'

import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'

export interface ITokenPresenter {
  login(parameters: { account: string; password: string }): Promise<Either<IErrorDTO, string>>
  logout(): Promise<Either<IErrorDTO, void>>
  refreshToken(): Promise<Either<IErrorDTO, string>>
  getRefreshToken(): Promise<string | null>
  getAccessToken(): string
}
