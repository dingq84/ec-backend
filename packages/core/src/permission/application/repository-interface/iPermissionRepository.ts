import { Either } from 'fp-ts/lib/Either'

import { IErrorInputPort } from '@/common/application/interface/iErrorUseCase'
import { IPermissionEntity } from '@/permission/domain/interface/iPermissionEntity'

export interface IPermissionRepository {
  getPermissionList(): Promise<Either<IErrorInputPort, IPermissionEntity[]>>
}
