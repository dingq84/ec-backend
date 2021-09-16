import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { IGetPermissionListOutputPort } from '@/permission/application/interface/iGetPermissionListUseCase'
import { Status } from '@/common/constants/status'

export interface IGetRoleDetailInputPort {
  id: number
}

export interface IGetRoleDetailOutputPort {
  id: number
  name: string
  status: Status
  statusText: string
  createdUser: string
  createdAt: string
  updatedUser: string
  updatedAt: string
  permissions: Pick<IGetPermissionListOutputPort, 'id' | 'name'>[]
}

export interface IGetRoleDetailUseCase {
  getRoleDetail(
    parameters: IGetRoleDetailInputPort
  ): Promise<Either<IErrorOutputPort, IGetRoleDetailOutputPort>>
}
