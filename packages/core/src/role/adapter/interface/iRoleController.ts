import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import {
  IGetRoleListInputPort,
  IGetRoleListOutputPort
} from '@/role/application/interface/iGetRoleListUseCase'
import { IUpdateRoleStatusInputPort } from '@/role/application/interface/iUpdateRoleStatusUseCase'
import { IDeleteRoleInputPort } from '@/role/application/interface/iDeleteRoleUseCase'
import { ICreateRoleInputPort } from '@/role/application/interface/iCreateRoleUseCase'

export interface IRoleController {
  getRoleList(
    parameters: IGetRoleListInputPort
  ): Promise<Either<IErrorOutputPort, IGetRoleListOutputPort>>
  updateRoleStatus(parameters: IUpdateRoleStatusInputPort): Promise<Either<IErrorOutputPort, void>>
  deleteRole(parameters: IDeleteRoleInputPort): Promise<Either<IErrorOutputPort, void>>
  createRole(parameters: ICreateRoleInputPort): Promise<Either<IErrorOutputPort, void>>
}
