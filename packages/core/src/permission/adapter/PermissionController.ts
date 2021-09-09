import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { IPermissionController } from '@/permission/adapter/interface/iPermissionController'
import {
  IGetPermissionListUseCase,
  IGetPermissionListOutputPort
} from '@/permission/application/interface/iGetPermissionListUseCase'

class PermissionController implements IPermissionController {
  constructor(private readonly getPermissionListUseCase: IGetPermissionListUseCase) {}

  getPermissionList(): Promise<Either<IErrorOutputPort, IGetPermissionListOutputPort[]>> {
    return this.getPermissionListUseCase.getPermissionList()
  }
}

export default PermissionController
