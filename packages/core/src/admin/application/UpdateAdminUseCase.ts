import { Either, left } from 'fp-ts/lib/Either'

import {
  IUpdateAdminInputPort,
  IUpdateAdminUseCase
} from '@/admin/application/interface/iUpdateAdminUseCase'
import { IAdminRepository } from '@/admin/application/repository-interface/iAdminRepository'
import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import AdminEntity from '@/admin/domain/AdminEntity'

class UpdateAdminUseCase implements IUpdateAdminUseCase {
  constructor(
    private readonly adminRepository: IAdminRepository,
    private readonly errorPresenter: IErrorPresenter
  ) {}

  async updateAdmin(parameters: IUpdateAdminInputPort): Promise<Either<IErrorOutputPort, void>> {
    const result = AdminEntity.updateAdminValidate(parameters)
    if (result !== true) {
      return this.errorPresenter.present<void>(left(result))
    }

    return this.errorPresenter.present<void>(await this.adminRepository.updateAdmin(parameters))
  }
}

export default UpdateAdminUseCase
