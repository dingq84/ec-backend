import { Either } from 'fp-ts/lib/Either'

import { IUpdatePasswordInputPort } from '@/admin/application/interface/iUpdatePasswordUseCase'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import {
  IGetAccountListInputPort,
  IGetAccountListOutputPort
} from '@/admin/application/interface/iGetAccountListUseCase'

export interface IAccountController {
  updatePassword(parameters: IUpdatePasswordInputPort): Promise<Either<IErrorOutputPort, void>>
  getAccountList(
    parameters: IGetAccountListInputPort
  ): Promise<Either<IErrorOutputPort, IGetAccountListOutputPort>>
}
