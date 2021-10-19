import { Either, left } from 'fp-ts/lib/Either'

import {
  ICreateAdminInputPort,
  ICreateAdminUseCase
} from '@/admin/application/interface/iCreateAdminUseCase'
import { IAdminRepository } from '@/admin/application/repository-interface/iAdminRepository'
import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import AdminEntity from '@/admin/domain/AdminEntity'

class CreateAdminUseCase implements ICreateAdminUseCase {
  constructor(
    private readonly adminRepository: IAdminRepository,
    private readonly errorPresenter: IErrorPresenter
  ) {}

  async createAdmin(parameters: ICreateAdminInputPort): Promise<Either<IErrorOutputPort, void>> {
    const result = AdminEntity.createAdminValidate(parameters)
    if (result !== true) {
      return this.errorPresenter.present<void>(left(result))
    }

    return this.errorPresenter.present<void>(await this.adminRepository.createAdmin(parameters))
  }
}

export default CreateAdminUseCase
