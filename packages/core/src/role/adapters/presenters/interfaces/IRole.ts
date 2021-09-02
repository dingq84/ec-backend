import { Either } from 'fp-ts/lib/Either'

import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'
import { IPaginationDTO } from '@/common/domains/dto/PaginationDTO'
import { IRoleDTO, Status } from '@/role/domains/dto/RoleDTO'
import { Order } from '@/common/constants/order'

export interface IRolePresenter {
  getRoleList: (parameters: {
    status?: Status
    name?: string
    orderField: 'createdAt' | 'updatedAt'
    orderBy: Order
  }) => Promise<Either<IErrorDTO, { roles: IRoleDTO[]; pagination: IPaginationDTO }>>
}
