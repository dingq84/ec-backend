import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { IGetPermissionListOutputPort } from '@/permission/application/interface/iGetPermissionListUseCase'
import { Status } from '@/common/constants/status'

export interface IUpdateRoleInputPort {
  id: number
  name: string
  status: Status
  permissions: IGetPermissionListOutputPort[]
}

export interface IUpdateRoleUseCase {
  updateRole(parameters: IUpdateRoleInputPort): Promise<Either<IErrorOutputPort, void>>
}
