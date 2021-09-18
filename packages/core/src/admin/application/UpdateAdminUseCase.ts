import { Either } from 'fp-ts/lib/Either'

import {
  IUpdateAdminInputPort,
  IUpdateAdminUseCase
} from '@/admin/application/interface/iUpdateAdminUseCase'
import { IAdminRepository } from '@/admin/application/repository-interface/iAdminRepository'
import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'

class UpdateAdminUseCase implements IUpdateAdminUseCase {
  constructor(
    private readonly adminRepository: IAdminRepository,
    private readonly errorPresenter: IErrorPresenter
  ) {}

  async updateAdmin(parameters: IUpdateAdminInputPort): Promise<Either<IErrorOutputPort, void>> {
    return this.errorPresenter.present<void>(await this.adminRepository.updateAdmin(parameters))
  }
}

export default UpdateAdminUseCase
