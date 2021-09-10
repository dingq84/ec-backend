import { Either } from 'fp-ts/lib/Either'

import { Order } from '@/common/constants/order'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { IPaginationOutputPort } from '@/common/application/interface/iPaginationUseCase'
import { IGetPermissionListOutputPort } from '@/permission/application/interface/iGetPermissionListUseCase'
import { Status } from '@/role/domain/interface/iRoleEntity'

export interface IGetRoleListInputPort {
  status?: Status
  name?: string
  orderBy: Order
  page: number
}

export interface IGetRoleOutput {
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

export interface IGetRoleListOutputPort {
  roles: IGetRoleOutput[]
  pagination: IPaginationOutputPort
}

export interface IGetRoleListUseCase {
  getRoleList(
    parameters: IGetRoleListInputPort
  ): Promise<Either<IErrorOutputPort, IGetRoleListOutputPort>>
}
