import { Either } from 'fp-ts/lib/Either'

import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'

import { IRoleEntity, Status } from '@/role/domains/entities/interfaces/IRole'
import { IPaginationDTO } from '@/common/domains/dto/PaginationDTO'
import { Order } from '@/common/constants/order'

export interface IRoleRepository {
  getRoleList(parameters: {
    status?: Status
    name?: string
    orderField: 'createdAt' | 'updatedAt'
    orderBy: Order
  }): Promise<Either<IErrorDTO, { roles: IRoleEntity[]; pagination: IPaginationDTO }>>
}
