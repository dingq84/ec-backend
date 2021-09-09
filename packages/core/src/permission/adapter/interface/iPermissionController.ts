import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { IGetPermissionListOutputPort } from '@/permission/application/interface/iGetPermissionListUseCase'

export interface IPermissionController {
  getPermissionList(): Promise<Either<IErrorOutputPort, IGetPermissionListOutputPort[]>>
}
