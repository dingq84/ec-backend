import { Either, left } from 'fp-ts/lib/Either'

import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import {
  IUpdateRoleInputPort,
  IUpdateRoleUseCase
} from '@/role/application/interface/iUpdateRoleUseCase'
import {
  IRoleRepository,
  IRoleRepositoryParameters
} from '@/role/application/repository-interface/iRoleRepository'
import RoleEntity from '@/role/domain/RoleEntity'

class UpdateRoleUseCase implements IUpdateRoleUseCase {
  constructor(
    private readonly rolRepository: IRoleRepository,
    private readonly errorPresenter: IErrorPresenter
  ) {}

  async updateRole(parameters: IUpdateRoleInputPort): Promise<Either<IErrorOutputPort, void>> {
    const newParameters: IRoleRepositoryParameters['updateRole'] = {
      id: parameters.id,
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

    // 檢查邏輯和創建角色一樣，這邊共用
    const result = RoleEntity.createRoleValidate(newParameters)
    if (result !== true) {
      return this.errorPresenter.present<void>(left(result))
    }

    return this.errorPresenter.present<void>(await this.rolRepository.updateRole(newParameters))
  }
}

export default UpdateRoleUseCase
