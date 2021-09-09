import { isLeft } from 'fp-ts/lib/Either'

import { ICheckIsLoggedUseCase } from '@/auth/application/interface/iCheckIsLoggedUseCase'
import { IRefreshTokenUseCase } from '@/auth/application/interface/iRefreshTokenUseCase'
import { IAuthRepository } from '@/auth/application/repository-interface/iAuthRepository'

class CheckIsLoggedUseCase implements ICheckIsLoggedUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly refreshTokenUseCase: IRefreshTokenUseCase
  ) {}

  async checkIsLogged(): Promise<boolean> {
    const accessToken = this.authRepository.getAccessToken()

    if (accessToken === '') {
      const tokenEntity = await this.refreshTokenUseCase.refreshToken()
      if (isLeft(tokenEntity)) {
        return false
      }
    }

    const meEntity = await this.authRepository.getMe()

    if (isLeft(meEntity)) {
      return false
    }

    return true
  }
}

export default CheckIsLoggedUseCase
