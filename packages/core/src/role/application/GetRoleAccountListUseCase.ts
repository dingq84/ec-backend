import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import {
  IGetRoleAccountListInputPort,
  IGetRoleAccountListOutputPort,
  IGetRoleAccountListUseCase
} from '@/role/application/interface/iGetRoleAccountListUseCase'
import { IRolePresenter } from '@/role/adapter/interface/iRolePresenter'
import { IRoleRepository } from '@/role/application/repository-interface/iRoleRepository'

class GetRoleAccountListUseCase implements IGetRoleAccountListUseCase {
  constructor(
    private readonly roleRepository: IRoleRepository,
    private readonly rolePresenter: IRolePresenter
  ) {}

  async getRoleAccountList(
    parameters: IGetRoleAccountListInputPort
  ): Promise<Either<IErrorOutputPort, IGetRoleAccountListOutputPort>> {
    const roleAccountEntities = await this.roleRepository.getRoleAccountList({ id: parameters.id })
    return this.rolePresenter.getRoleAccountList(roleAccountEntities)
  }
}

export default GetRoleAccountListUseCase
