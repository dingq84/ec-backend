import { Either, left } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'
import {
  IGetRoleDetailInputPort,
  IGetRoleDetailOutputPort,
  IGetRoleDetailUseCase
} from '@/role/application/interface/iGetRoleDetailUseCase'
import { IRolePresenter } from '@/role/adapter/interface/iRolePresenter'
import { IRoleRepository } from '@/role/application/repository-interface/iRoleRepository'
import RoleEntity from '@/role/domain/RoleEntity'

class GetRoleDetailUseCase implements IGetRoleDetailUseCase {
  constructor(
    private readonly roleRepository: IRoleRepository,
    private readonly rolePresenter: IRolePresenter,
    private readonly errorPresenter: IErrorPresenter
  ) {}

  async getRoleDetail(
    parameters: IGetRoleDetailInputPort
  ): Promise<Either<IErrorOutputPort, IGetRoleDetailOutputPort>> {
    const validResult = RoleEntity.deleteRoleValidate(parameters)
    if (validResult !== true) {
      return this.errorPresenter.present<IGetRoleDetailOutputPort>(left(validResult))
    }

    const roleEntity = await this.roleRepository.getRoleDetail(parameters)
    return this.rolePresenter.getRoleDetail(roleEntity)
  }
}

export default GetRoleDetailUseCase
