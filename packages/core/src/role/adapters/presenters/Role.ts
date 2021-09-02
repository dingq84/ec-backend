import { Either } from 'fp-ts/lib/Either'

import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'
import { IPaginationDTO } from '@/common/domains/dto/PaginationDTO'
import { IRoleDTO, Status as StatusRoleDTO } from '@/role/domains/dto/RoleDTO'
import { IRoleUseCase } from '@/role/domains/useCases/interfaces/IRole'
import { IRolePresenter } from '@/role/adapters/presenters/interfaces/IRole'
import { Status as StatusRoleEntity } from '@/role/domains/entities/interfaces/IRole'
import { Order } from '@/common/constants/order'

class RolePresenter implements IRolePresenter {
  constructor(private readonly roleUseCase: IRoleUseCase) {}

  async getRoleList(parameters: {
    status?: StatusRoleDTO
    name?: string
    orderField: 'createdAt' | 'updatedAt'
    orderBy: Order
  }): Promise<Either<IErrorDTO, { roles: IRoleDTO[]; pagination: IPaginationDTO }>> {
    const { status, name } = parameters
    if (status !== StatusRoleDTO.active && status !== StatusRoleDTO.inactive) {
      delete parameters.status
    }

    if (!name) {
      delete parameters.name
    }

    return await this.roleUseCase.getRoleList(
      parameters as {
        status?: StatusRoleEntity
        name?: string
        orderField: 'createdAt' | 'updatedAt'
        orderBy: Order
      }
    )
  }
}

export default RolePresenter
