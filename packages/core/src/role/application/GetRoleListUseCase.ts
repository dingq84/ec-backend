import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import {
  IGetRoleListInputPort,
  IGetRoleListOutputPort,
  IGetRoleListUseCase
} from '@/role/application/interface/iGetRoleListUseCase'
import { Either } from 'fp-ts/lib/Either'
import { IRoleRepository } from '@/role/application/repository-interface/iRoleRepository'
import { IRolePresenter } from '@/role/adapter/interface/iRolePresenter'

class GetRoleListUseCase implements IGetRoleListUseCase {
  constructor(
    private readonly roleRepository: IRoleRepository,
    private readonly rolePresenter: IRolePresenter
  ) {}

  async getRoleList(
    parameters: IGetRoleListInputPort
  ): Promise<Either<IErrorOutputPort, IGetRoleListOutputPort>> {
    const newParameter: IGetRoleListInputPort = {
      orderBy: parameters.orderBy,
      page: parameters.page
    }
    if (parameters.status) {
      newParameter.status = parameters.status
    }

    if (parameters.name) {
      newParameter.name = parameters.name
    }

    const roleListEntity = await this.roleRepository.getRoleList(newParameter)
    return this.rolePresenter.getRoleList(roleListEntity)
  }
}

export default GetRoleListUseCase
