import { Either, left } from 'fp-ts/lib/Either'

import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'
import { IPaginationDTO } from '@/common/domains/dto/PaginationDTO'
import { StatusCode } from '@/common/constants/statusCode'
import { Order } from '@/common/constants/order'
import { IRoleDTO, Status as StatusRoleDTO } from '@/role/domains/dto/RoleDTO'
import { IRoleUseCase } from '@/role/domains/useCases/interfaces/IRole'
import { IRolePresenter } from '@/role/adapters/presenters/interfaces/IRole'
import { Status as StatusRoleEntity } from '@/role/domains/entities/interfaces/IRole'
import RoleErrorDTO from '@/role/domains/dto/RoleErrorDTO'

class RolePresenter implements IRolePresenter {
  constructor(private readonly roleUseCase: IRoleUseCase) {}

  async getRoleList(parameters: {
    status?: StatusRoleDTO
    name?: string
    orderField: 'createAt' | 'updateAt'
    orderBy: Order
    page: number
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
        orderField: 'createAt' | 'updateAt'
        orderBy: Order
        page: number
      }
    )
  }

  async updateRoleStatus(parameters: {
    id: number
    status: StatusRoleDTO
  }): Promise<Either<IErrorDTO, void>> {
    const { status } = parameters

    if (status !== StatusRoleDTO.active && status !== StatusRoleDTO.inactive) {
      const statusMessage = '狀態變更只能為啟用或停用'
      return left(new RoleErrorDTO({ statusCode: StatusCode.wrongStatus, statusMessage }))
    }

    return await this.roleUseCase.updateRoleStatus(
      parameters as {
        id: number
        status: StatusRoleEntity
      }
    )
  }
}

export default RolePresenter
