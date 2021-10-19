import { Either, isRight, left } from 'fp-ts/lib/Either'

import { IAuthPresenter } from '@/auth/adapter/interface/iAuthPresenter'
import {
  ILoginInputPort,
  ILoginOutputPort,
  ILoginUseCase
} from '@/auth/application/interface/iLoginUseCase'
import { IAuthRepository } from '@/auth/application/repository-interface/iAuthRepository'
import TokenEntity from '@/auth/domain/TokenEntity'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'

class LoginUseCase implements ILoginUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly authPresenter: IAuthPresenter,
    private readonly errorPresenter: IErrorPresenter
  ) {}

  async login(parameters: ILoginInputPort): Promise<Either<IErrorOutputPort, ILoginOutputPort>> {
    const result = TokenEntity.loginValidate(parameters)
    if (result !== true) {
      return this.errorPresenter.present<ILoginOutputPort>(left(result))
    }

    const tokenEntity = await this.authRepository.login(parameters)

    if (isRight(tokenEntity)) {
      const { accessToken, refreshToken } = tokenEntity.right
      this.authRepository.setRefreshToken(accessToken, refreshToken)
    }

    return this.authPresenter.login(tokenEntity)
  }
}

export default LoginUseCase
