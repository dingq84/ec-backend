import { Either } from 'fp-ts/lib/Either'

import { IUpdatePasswordInputPort } from '@/admin/application/interface/iUpdatePasswordUseCase'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import {
  IGetAdminListInputPort,
  IGetAdminListOutputPort
} from '@/admin/application/interface/iGetAdminListUseCase'
import { ICreateAdminInputPort } from '@/admin/application/interface/iCreateAdminUseCase'
import { IUpdateAdminInputPort } from '@/admin/application/interface/iUpdateAdminUseCase'
import { IUpdateAdminStatusInputPort } from '@/admin/application/interface/iUpdateAdminStatusUseCase'
import { IDeleteAdminInputPort } from '@/admin/application/interface/iDeleteAdminUseCase'
import {
  IGetAdminDetailInputPort,
  IGetAdminDetailOutputPort
} from '@/admin/application/interface/iGetAdminDetailUseCase'

export interface IAdminController {
  updatePassword(parameters: IUpdatePasswordInputPort): Promise<Either<IErrorOutputPort, void>>
  getAdminList(
    parameters: IGetAdminListInputPort
  ): Promise<Either<IErrorOutputPort, IGetAdminListOutputPort>>
  createAdmin(parameters: ICreateAdminInputPort): Promise<Either<IErrorOutputPort, void>>
  updateAdmin(parameters: IUpdateAdminInputPort): Promise<Either<IErrorOutputPort, void>>
  updateAdminStatus(
    parameters: IUpdateAdminStatusInputPort
  ): Promise<Either<IErrorOutputPort, void>>
  deleteAdmin(parameters: IDeleteAdminInputPort): Promise<Either<IErrorOutputPort, void>>
  getAdminDetail(
    parameters: IGetAdminDetailInputPort
  ): Promise<Either<IErrorOutputPort, IGetAdminDetailOutputPort>>
}
