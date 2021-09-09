import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { IRoleController } from '@/role/adapter/interface/iRoleController'
import {
  IGetRoleListInputPort,
  IGetRoleListOutputPort,
  IGetRoleListUseCase
} from '@/role/application/interface/iGetRoleListUseCase'
import {
  IUpdateRoleStatusInputPort,
  IUpdateRoleStatusUseCase
} from '@/role/application/interface/iUpdateRoleStatusUseCase'
import {
  IDeleteRoleInputPort,
  IDeleteRoleUseCase
} from '@/role/application/interface/iDeleteRoleUseCase'

class RoleController implements IRoleController {
  constructor(
    private readonly getRoleListUseCase: IGetRoleListUseCase,
    private readonly updateRoleStatusUseCase: IUpdateRoleStatusUseCase,
    private readonly deleteRoleUseCase: IDeleteRoleUseCase
  ) {}

  getRoleList(
    parameters: IGetRoleListInputPort
  ): Promise<Either<IErrorOutputPort, IGetRoleListOutputPort>> {
    return this.getRoleListUseCase.getRoleList(parameters)
  }

  updateRoleStatus(
    parameters: IUpdateRoleStatusInputPort
  ): Promise<Either<IErrorOutputPort, void>> {
    return this.updateRoleStatusUseCase.updateRoleStatus(parameters)
  }

  deleteRole(parameters: IDeleteRoleInputPort): Promise<Either<IErrorOutputPort, void>> {
    return this.deleteRoleUseCase.deleteRole(parameters)
  }
}

export default RoleController
