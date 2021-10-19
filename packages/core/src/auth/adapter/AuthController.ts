import { Either } from 'fp-ts/lib/Either'

import { IAuthController } from '@/auth/adapter/interface/iAuthController'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { IGetMeOutPort, IGetMeUseCase } from '@/auth/application/interface/iGetMeUseCase'
import {
  ILoginInputPort,
  ILoginOutputPort,
  ILoginUseCase
} from '@/auth/application/interface/iLoginUseCase'
import { ILogoutUseCase } from '@/auth/application/interface/iLogoutUseCase'
import {
  IRefreshTokenOutputPort,
  IRefreshTokenUseCase
} from '@/auth/application/interface/iRefreshTokenUseCase'
import { IGetAccessTokenUseCase } from '@/auth/application/interface/iGetAccessTokenUseCase'
import { ICheckIsLoggedUseCase } from '@/auth/application/interface/iCheckIsLoggedUseCase'
import { IRemoveRefreshTokenUseCase } from '@/auth/application/interface/iRemoveRefreshTokenUseCase'

class AuthController implements IAuthController {
  constructor(
    private readonly loginUseCase: ILoginUseCase,
    private readonly logoutUseCase: ILogoutUseCase,
    private readonly refreshTokenUseCase: IRefreshTokenUseCase,
    private readonly getMeUseCase: IGetMeUseCase,
    private readonly getAccessTokenUseCase: IGetAccessTokenUseCase,
    private readonly checkIsLoggedUseCase: ICheckIsLoggedUseCase,
    private readonly removeRefreshTokenUseCase: IRemoveRefreshTokenUseCase
  ) {}

  login(parameters: ILoginInputPort): Promise<Either<IErrorOutputPort, ILoginOutputPort>> {
    return this.loginUseCase.login(parameters)
  }

  logout(): Promise<Either<IErrorOutputPort, void>> {
    return this.logoutUseCase.logout()
  }

  refreshToken(): Promise<Either<IErrorOutputPort, IRefreshTokenOutputPort>> {
    return this.refreshTokenUseCase.refreshToken()
  }

  getMe(): Promise<Either<IErrorOutputPort, IGetMeOutPort>> {
    return this.getMeUseCase.getMe()
  }

  getAccessToken(): string {
    return this.getAccessTokenUseCase.getAccessToken()
  }

  checkIsLogged(): Promise<boolean> {
    return this.checkIsLoggedUseCase.checkIsLogged()
  }

  removeRefreshToken(): void {
    return this.removeRefreshTokenUseCase.removeRefreshToken()
  }
}

export default AuthController
