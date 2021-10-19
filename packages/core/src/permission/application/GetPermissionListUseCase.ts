import { Either } from 'fp-ts/lib/Either'

import {
  IGetPermissionListOutputPort,
  IGetPermissionListUseCase
} from '@/permission/application/interface/iGetPermissionListUseCase'
import { IPermissionRepository } from '@/permission/application/repository-interface/iPermissionRepository'
import { IPermissionPresenter } from '@/permission/adapter/interface/iPermissionPresenter'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'

class GerPermissionListUseCase implements IGetPermissionListUseCase {
  constructor(
    private readonly permissionRepository: IPermissionRepository,
    private readonly permissionPresenter: IPermissionPresenter
  ) {}

  async getPermissionList(): Promise<Either<IErrorOutputPort, IGetPermissionListOutputPort[]>> {
    const permissionEntity = await this.permissionRepository.getPermissionList()
    return this.permissionPresenter.getPermissionList(permissionEntity)
  }
}

export default GerPermissionListUseCase
