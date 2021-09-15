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
import {
  ICreateRoleInputPort,
  ICreateRoleUseCase
} from '@/role/application/interface/iCreateRoleUseCase'
import {
  IGetRoleDetailInputPort,
  IGetRoleDetailOutputPort,
  IGetRoleDetailUseCase
} from '@/role/application/interface/iGetRoleDetailUseCase'
import {
  IUpdateRoleInputPort,
  IUpdateRoleUseCase
} from '@/role/application/interface/iUpdateRoleUseCase'

class RoleController implements IRoleController {
  constructor(
    private readonly getRoleListUseCase: IGetRoleListUseCase,
    private readonly updateRoleStatusUseCase: IUpdateRoleStatusUseCase,
    private readonly deleteRoleUseCase: IDeleteRoleUseCase,
    private readonly createRoleUseCase: ICreateRoleUseCase,
    private readonly getRoleDetailUseCase: IGetRoleDetailUseCase,
    private readonly updateRoleUseCase: IUpdateRoleUseCase
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

  createRole(parameters: ICreateRoleInputPort): Promise<Either<IErrorOutputPort, void>> {
    return this.createRoleUseCase.createRole(parameters)
  }

  getRoleDetail(
    parameters: IGetRoleDetailInputPort
  ): Promise<Either<IErrorOutputPort, IGetRoleDetailOutputPort>> {
    return this.getRoleDetailUseCase.getRoleDetail(parameters)
  }

  updateRole(parameters: IUpdateRoleInputPort): Promise<Either<IErrorOutputPort, void>> {
    return this.updateRoleUseCase.updateRole(parameters)
  }
}

export default RoleController
