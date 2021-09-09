import { Either } from 'fp-ts/lib/Either'

import { IErrorInputPort } from '@/common/application/interface/iErrorUseCase'
import { IPaginationInputPort } from '@/common/application/interface/iPaginationUseCase'
import { IRoleEntity, Status } from '@/role/domain/interface/iRoleEntity'
import { Order } from '@/common/constants/order'

export interface IRoleRepositoryParameters {
  getRoleList: {
    status?: Status
    name?: string
    orderBy: Order
    page: number
  }
  updateRoleStatus: {
    id: number
    status: Status
  }
  deleteRole: {
    id: number
  }
}
export interface IRoleRepository {
  getRoleList(
    parameters: IRoleRepositoryParameters['getRoleList']
  ): Promise<Either<IErrorInputPort, { roles: IRoleEntity[]; pagination: IPaginationInputPort }>>
  updateRoleStatus(
    parameters: IRoleRepositoryParameters['updateRoleStatus']
  ): Promise<Either<IErrorInputPort, void>>
  deleteRole(
    parameters: IRoleRepositoryParameters['deleteRole']
  ): Promise<Either<IErrorInputPort, void>>
}
