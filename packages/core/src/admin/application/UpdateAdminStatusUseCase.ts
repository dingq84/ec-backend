import { Either } from 'fp-ts/lib/Either'

import {
  IUpdateAdminStatusInputPort,
  IUpdateAdminStatusUseCase
} from '@/admin/application/interface/iUpdateAdminStatusUseCase'
import { IAdminRepository } from '@/admin/application/repository-interface/iAdminRepository'
import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'

class UpdateAdminStatusUseCase implements IUpdateAdminStatusUseCase {
  constructor(
    private readonly accountRepository: IAdminRepository,
    private readonly errorPresenter: IErrorPresenter
  ) {}

  async updateAdminStatus(
    parameters: IUpdateAdminStatusInputPort
  ): Promise<Either<IErrorOutputPort, void>> {
    return this.errorPresenter.present<void>(
      await this.accountRepository.updateAdminStatus(parameters)
    )
  }
}

export default UpdateAdminStatusUseCase
