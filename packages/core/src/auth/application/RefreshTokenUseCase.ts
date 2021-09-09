import { Either, isRight, left } from 'fp-ts/lib/Either'

import { IAuthPresenter } from '@/auth/adapter/interface/iAuthPresenter'
import TokenEntity from '@/auth/domain/TokenEntity'
import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import {
  IRefreshTokenOutputPort,
  IRefreshTokenUseCase
} from '@/auth/application/interface/iRefreshTokenUseCase'
import { IAuthRepository } from '@/auth/application/repository-interface/iAuthRepository'

class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly authPresenter: IAuthPresenter,
    private readonly errorPresenter: IErrorPresenter
  ) {}

  async refreshToken(): Promise<Either<IErrorOutputPort, IRefreshTokenOutputPort>> {
    const refreshToken = await this.authRepository.getRefreshToken()

    const result = TokenEntity.refreshTokenValidate({ refreshToken })

    if (result !== true) {
      return this.errorPresenter.present<IRefreshTokenOutputPort>(left(result))
    }

    const tokenEntity = await this.authRepository.refreshToken({
      refreshToken: refreshToken as string
    })

    if (isRight(tokenEntity)) {
      const { accessToken, refreshToken } = tokenEntity.right
      this.authRepository.setRefreshToken(accessToken, refreshToken)
    }

    return this.authPresenter.refreshToken(tokenEntity)
  }
}

export default RefreshTokenUseCase
