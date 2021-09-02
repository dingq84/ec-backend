import { either } from 'fp-ts'
import { Either } from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'

import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'
import { IPaginationDTO } from '@/common/domains/dto/PaginationDTO'
import { IRoleUseCase } from '@/role/domains/useCases/interfaces/IRole'
import RoleDTO, { IRoleDTO } from '@/role/domains/dto/RoleDTO'
import { IRoleRepository } from '@/role/domains/useCases/repositories-interfaces/IRole'
import { IRoleEntity, Status } from '@/role/domains/entities/interfaces/IRole'
import { Order } from '@/common/constants/order'

class RoleUseCase implements IRoleUseCase {
  constructor(private readonly roleRepository: IRoleRepository) {}

  async getRoleList(parameters: {
    status: Status
    name: string
    orderField: 'createdAt' | 'updatedAt'
    orderBy: Order
  }): Promise<Either<IErrorDTO, { roles: IRoleDTO[]; pagination: IPaginationDTO }>> {
    const result = await this.roleRepository.getRoleList(parameters)

    return flow(
      either.map((response: { roles: IRoleEntity[]; pagination: IPaginationDTO }) => ({
        ...response,
        roles: response.roles.map(role => new RoleDTO(role))
      }))
    )(result)
  }
}

export default RoleUseCase
