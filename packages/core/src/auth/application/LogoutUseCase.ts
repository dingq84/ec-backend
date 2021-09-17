import { Either, isRight } from 'fp-ts/lib/Either'

import { ILogoutUseCase } from '@/auth/application/interface/iLogoutUseCase'
import { IAuthRepository } from '@/auth/application/repository-interface/iAuthRepository'
import { IRemoveRefreshTokenUseCase } from '@/auth/application/interface/iRemoveRefreshTokenUseCase'
import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'

class LogoutUseCase implements ILogoutUseCase {
  constructor(
    private readonly removeRefreshTokenUseCase: IRemoveRefreshTokenUseCase,
    private readonly authRepository: IAuthRepository,
    private readonly errorPresenter: IErrorPresenter
  ) {}

  async logout(): Promise<Either<IErrorOutputPort, void>> {
    const result = await this.authRepository.logout()

    if (isRight(result)) {
      this.removeRefreshTokenUseCase.removeRefreshToken()
    }

    return this.errorPresenter.present<void>(result)
  }
}

export default LogoutUseCase
