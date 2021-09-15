import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import {
  IGetRoleListInputPort,
  IGetRoleListOutputPort
} from '@/role/application/interface/iGetRoleListUseCase'
import { IUpdateRoleStatusInputPort } from '@/role/application/interface/iUpdateRoleStatusUseCase'
import { IDeleteRoleInputPort } from '@/role/application/interface/iDeleteRoleUseCase'
import { ICreateRoleInputPort } from '@/role/application/interface/iCreateRoleUseCase'
import {
  IGetRoleDetailInputPort,
  IGetRoleDetailOutputPort
} from '@/role/application/interface/iGetRoleDetailUseCase'
import { IUpdateRoleInputPort } from '@/role/application/interface/iUpdateRoleUseCase'

export interface IRoleController {
  getRoleList(
    parameters: IGetRoleListInputPort
  ): Promise<Either<IErrorOutputPort, IGetRoleListOutputPort>>
  updateRoleStatus(parameters: IUpdateRoleStatusInputPort): Promise<Either<IErrorOutputPort, void>>
  deleteRole(parameters: IDeleteRoleInputPort): Promise<Either<IErrorOutputPort, void>>
  createRole(parameters: ICreateRoleInputPort): Promise<Either<IErrorOutputPort, void>>
  getRoleDetail(
    parameters: IGetRoleDetailInputPort
  ): Promise<Either<IErrorOutputPort, IGetRoleDetailOutputPort>>
  updateRole(parameters: IUpdateRoleInputPort): Promise<Either<IErrorOutputPort, void>>
}
