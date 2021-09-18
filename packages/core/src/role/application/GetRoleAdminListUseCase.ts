import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import {
  IGetRoleAdminListInputPort,
  IGetRoleAdminListOutputPort,
  IGetRoleAdminListUseCase
} from '@/role/application/interface/iGetRoleAdminListUseCase'
import { IRolePresenter } from '@/role/adapter/interface/iRolePresenter'
import { IRoleRepository } from '@/role/application/repository-interface/iRoleRepository'

class GetRoleAdminListUseCase implements IGetRoleAdminListUseCase {
  constructor(
    private readonly roleRepository: IRoleRepository,
    private readonly rolePresenter: IRolePresenter
  ) {}

  async getRoleAdminList(
    parameters: IGetRoleAdminListInputPort
  ): Promise<Either<IErrorOutputPort, IGetRoleAdminListOutputPort>> {
    const roleAdminEntities = await this.roleRepository.getRoleAdminList({ id: parameters.id })
    return this.rolePresenter.getRoleAdminList(roleAdminEntities)
  }
}

export default GetRoleAdminListUseCase
