import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'

export interface IRefreshTokenOutputPort {
  accessToken: string
}

export interface IRefreshTokenUseCase {
  refreshToken(): Promise<Either<IErrorOutputPort, IRefreshTokenOutputPort>>
}
