import { Either } from 'fp-ts/lib/Either'

import { IErrorInputPort } from '@/common/application/interface/iErrorUseCase'
import { IPaginationInputPort } from '@/common/application/interface/iPaginationUseCase'
import { IRoleEntity, Status } from '@/role/domain/interface/iRoleEntity'
import { Order } from '@/common/constants/order'
import { IAccountEntity } from '@/admin/domain/interface/iAccountEntity'

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
  createRole: {
    name: string
    status: Status
    permissions: number[]
  }
  getRoleDetail: {
    id: number
  }
  updateRole: {
    id: number
    name: string
    status: Status
    permissions: number[]
  }
  getRoleAccountList: {
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
  createRole(
    parameters: IRoleRepositoryParameters['createRole']
  ): Promise<Either<IErrorInputPort, void>>
  getRoleDetail(
    parameters: IRoleRepositoryParameters['getRoleDetail']
  ): Promise<Either<IErrorInputPort, IRoleEntity>>
  updateRole(
    parameters: IRoleRepositoryParameters['updateRole']
  ): Promise<Either<IErrorInputPort, void>>
  getRoleAccountList(
    parameters: IRoleRepositoryParameters['getRoleAccountList']
  ): Promise<Either<IErrorInputPort, { accounts: Array<Pick<IAccountEntity, 'id' | 'name'>> }>>
}
