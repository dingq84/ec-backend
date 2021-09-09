import { Either, left } from 'fp-ts/lib/Either'

import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import {
  IDeleteRoleInputPort,
  IDeleteRoleUseCase
} from '@/role/application/interface/iDeleteRoleUseCase'
import { IRoleRepository } from '@/role/application/repository-interface/iRoleRepository'
import RoleEntity from '@/role/domain/RoleEntity'

class DeleteRoleUseCase implements IDeleteRoleUseCase {
  constructor(
    private readonly roleRepository: IRoleRepository,
    private readonly errorPresenter: IErrorPresenter
  ) {}

  async deleteRole(parameters: IDeleteRoleInputPort): Promise<Either<IErrorOutputPort, void>> {
    const validResult = RoleEntity.deleteRoleValidate(parameters)
    if (validResult !== true) {
      return this.errorPresenter.present<void>(left(validResult))
    }

    const result = await this.roleRepository.deleteRole(parameters)
    return this.errorPresenter.present<void>(result)
  }
}

export default DeleteRoleUseCase
