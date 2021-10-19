import { Either, left } from 'fp-ts/lib/Either'

import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import {
  IUpdateRoleStatusInputPort,
  IUpdateRoleStatusUseCase
} from '@/role/application/interface/iUpdateRoleStatusUseCase'
import { IRoleRepository } from '@/role/application/repository-interface/iRoleRepository'
import RoleEntity from '@/role/domain/RoleEntity'

class UpdateRoleStatusUseCase implements IUpdateRoleStatusUseCase {
  constructor(
    private readonly roleRepository: IRoleRepository,
    private readonly errorPresenter: IErrorPresenter
  ) {}

  async updateRoleStatus(
    parameters: IUpdateRoleStatusInputPort
  ): Promise<Either<IErrorOutputPort, void>> {
    const validResult = RoleEntity.updateRoleStatusValidate(parameters)
    if (validResult !== true) {
      return this.errorPresenter.present<void>(left(validResult))
    }

    const result = await this.roleRepository.updateRoleStatus(parameters)
    return this.errorPresenter.present<void>(result)
  }
}

export default UpdateRoleStatusUseCase
