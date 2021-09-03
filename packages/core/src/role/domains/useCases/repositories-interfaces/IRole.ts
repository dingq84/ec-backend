import { Either } from 'fp-ts/lib/Either'

import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'

import { IRoleEntity, Status } from '@/role/domains/entities/interfaces/IRole'
import { IPaginationDTO } from '@/common/domains/dto/PaginationDTO'
import { Order } from '@/common/constants/order'

export interface IRoleRepository {
  getRoleList(parameters: {
    status?: Status
    name?: string
    orderBy: Order
    page: number
  }): Promise<Either<IErrorDTO, { roles: IRoleEntity[]; pagination: IPaginationDTO }>>

  updateRoleStatus(parameters: { id: number; status: Status }): Promise<Either<IErrorDTO, void>>

  deleteRole(id: number): Promise<Either<IErrorDTO, void>>
}
