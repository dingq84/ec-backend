import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'
import { Either } from 'fp-ts/lib/Either'

import { IPermissionEntity } from '@/permission/domains/entities/interfaces/IPermission'

export interface IPermissionRepository {
  getPermissions(): Promise<Either<IErrorDTO, IPermissionEntity[]>>
}
