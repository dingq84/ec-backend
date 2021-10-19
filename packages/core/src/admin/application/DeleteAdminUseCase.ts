import { Either } from 'fp-ts/lib/Either'

import {
  IDeleteAdminInputPort,
  IDeleteAdminUseCase
} from '@/admin/application/interface/iDeleteAdminUseCase'
import { IAdminRepository } from '@/admin/application/repository-interface/iAdminRepository'
import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'

class DeleteAdminUseCase implements IDeleteAdminUseCase {
  constructor(
    private readonly adminRepository: IAdminRepository,
    private readonly errorPresenter: IErrorPresenter
  ) {}

  async deleteAdmin(parameters: IDeleteAdminInputPort): Promise<Either<IErrorOutputPort, void>> {
    return this.errorPresenter.present<void>(await this.adminRepository.deleteAdmin(parameters))
  }
}

export default DeleteAdminUseCase
