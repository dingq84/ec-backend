import { Either, left } from 'fp-ts/lib/Either'

import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import {
  ICreateRoleInputPort,
  ICreateRoleUseCase
} from '@/role/application/interface/iCreateRoleUseCase'
import {
  IRoleRepository,
  IRoleRepositoryParameters
} from '@/role/application/repository-interface/iRoleRepository'
import RoleEntity from '@/role/domain/RoleEntity'

class CreateRoleUseCase implements ICreateRoleUseCase {
  constructor(
    private readonly rolRepository: IRoleRepository,
    private readonly errorPresenter: IErrorPresenter
  ) {}

  async createRole(parameters: ICreateRoleInputPort): Promise<Either<IErrorOutputPort, void>> {
    const newParameters: IRoleRepositoryParameters['createRole'] = {
      name: parameters.name,
      status: parameters.status,
      permissions: parameters.permissions.reduce((accumulate, current) => {
        if (current.value) {
          accumulate.push(current.id)
        } else {
          const isSelectedChildren = current.children
            .filter(child => child.value)
            .map(child => child.id)
          accumulate.push(...isSelectedChildren)
        }

        return accumulate
      }, [] as number[])
    }

    const result = RoleEntity.createRoleValidate(newParameters)
    if (result !== true) {
      return this.errorPresenter.present<void>(left(result))
    }

    return this.errorPresenter.present<void>(await this.rolRepository.createRole(newParameters))
  }
}

export default CreateRoleUseCase
