import { Either } from 'fp-ts/lib/Either'

import { IRoleDTO } from '@/role/domains/dto/RoleDTO'
import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'
import { IPaginationDTO } from '@/common/domains/dto/PaginationDTO'
import { Order } from '@/common/constants/order'
import { Status } from '@/role/domains/entities/interfaces/IRole'

export interface IRoleUseCase {
  getRoleList(parameters: {
    status?: Status
    name?: string
    orderField: 'createdAt' | 'updatedAt'
    orderBy: Order
  }): Promise<Either<IErrorDTO, { roles: IRoleDTO[]; pagination: IPaginationDTO }>>
}
