import { Either } from 'fp-ts/lib/Either'

import { ILogoutUseCase } from '@/auth/application/interface/iLogoutUseCase'
import { IAuthRepository } from '@/auth/application/repository-interface/iAuthRepository'
import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'

class LogoutUseCase implements ILogoutUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly errorPresenter: IErrorPresenter
  ) {}

  async logout(): Promise<Either<IErrorOutputPort, void>> {
    return this.errorPresenter.present<void>(await this.authRepository.logout())
  }
}

export default LogoutUseCase
