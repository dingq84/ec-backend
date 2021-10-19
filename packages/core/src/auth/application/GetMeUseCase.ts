import { Either } from 'fp-ts/lib/Either'

import { IAuthPresenter } from '@/auth/adapter/interface/iAuthPresenter'
import { IAuthRepository } from '@/auth/application/repository-interface/iAuthRepository'
import { IGetMeOutPort, IGetMeUseCase } from '@/auth/application/interface/iGetMeUseCase'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'

class GetMeUseCase implements IGetMeUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly authPresenter: IAuthPresenter
  ) {}

  async getMe(): Promise<Either<IErrorOutputPort, IGetMeOutPort>> {
    const meEntity = await this.authRepository.getMe()

    return this.authPresenter.getMe(meEntity)
  }
}

export default GetMeUseCase
