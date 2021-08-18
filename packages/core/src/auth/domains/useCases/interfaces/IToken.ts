import { Either } from 'fp-ts/lib/Either'

import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'

export interface ITokenUseCase {
  login(parameters: { account: string; password: string }): Promise<Either<IErrorDTO, string>>
  refreshToken(): Promise<Either<IErrorDTO, string>>
  logout(): Promise<Either<IErrorDTO, void>>
  getRefreshToken(): Promise<string | null>
  getAccessToken(): string
}
