import { Either } from 'fp-ts/lib/Either'

import { IGetMeOutPort } from '@/auth/application/interface/iGetMeUseCase'
import { IRefreshTokenOutputPort } from '@/auth/application/interface/iRefreshTokenUseCase'
import { ILoginInputPort, ILoginOutputPort } from '@/auth/application/interface/iLoginUseCase'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'

export interface IAuthController {
  login(parameters: ILoginInputPort): Promise<Either<IErrorOutputPort, ILoginOutputPort>>
  logout(): Promise<Either<IErrorOutputPort, void>>
  refreshToken(): Promise<Either<IErrorOutputPort, IRefreshTokenOutputPort>>
  getMe(): Promise<Either<IErrorOutputPort, IGetMeOutPort>>
  getAccessToken(): string
  checkIsLogged(): Promise<boolean>
  removeRefreshToken(): void
}
