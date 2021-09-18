import { Either } from 'fp-ts/lib/Either'

import {
  IGetAdminDetailInputPort,
  IGetAdminDetailOutputPort,
  IGetAdminDetailUseCase
} from '@/admin/application/interface/iGetAdminDetailUseCase'
import { IAdminRepository } from '@/admin/application/repository-interface/iAdminRepository'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { IAdminPresenter } from '@/admin/adapter/interface/iAdminPresenter'

class GetAdminDetailUseCase implements IGetAdminDetailUseCase {
  constructor(
    private readonly adminRepository: IAdminRepository,
    private readonly adminPresenter: IAdminPresenter
  ) {}

  async getAdminDetail(
    parameters: IGetAdminDetailInputPort
  ): Promise<Either<IErrorOutputPort, IGetAdminDetailOutputPort>> {
    return this.adminPresenter.getAdminDetail(await this.adminRepository.getAdminDetail(parameters))
  }
}

export default GetAdminDetailUseCase
