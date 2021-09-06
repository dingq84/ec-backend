import { Either } from 'fp-ts/lib/Either'

import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'
import { IPermissionDTO } from '@/permission/domains/dto/PermissionDTO'
import { IPermissionPresenter } from '@/permission/adapters/presenters/interfaces/IPermission'
import { IPermissionUseCase } from '@/permission/domains/useCases/interfaces/IPermission'

class PermissionPresenter implements IPermissionPresenter {
  constructor(private readonly permissionUseCase: IPermissionUseCase) {}

  getPermissions(): Promise<Either<IErrorDTO, IPermissionDTO[]>> {
    return this.permissionUseCase.getPermissions()
  }
}

export default PermissionPresenter
