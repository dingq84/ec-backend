import { Either } from 'fp-ts/lib/Either'

import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'
import { IPermissionDTO } from '@/permission/domains/dto/PermissionDTO'

export interface IPermissionPresenter {
  getPermissions(): Promise<Either<IErrorDTO, IPermissionDTO[]>>
}
