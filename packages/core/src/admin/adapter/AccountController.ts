import { Either } from 'fp-ts/lib/Either'

import {
  IUpdatePasswordInputPort,
  IUpdatePasswordUseCase
} from '@/admin/application/interface/iUpdatePasswordUseCase'
import { IAccountController } from '@/admin/adapter/interface/iAccountController'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import {
  IGetAccountListInputPort,
  IGetAccountListOutputPort,
  IGetAccountListUseCase
} from '@/admin/application/interface/iGetAccountListUseCase'

class AccountController implements IAccountController {
  constructor(
    private readonly updatePasswordUseCase: IUpdatePasswordUseCase,
    private readonly getAccountListUseCase: IGetAccountListUseCase
  ) {}

  updatePassword(parameters: IUpdatePasswordInputPort): Promise<Either<IErrorOutputPort, void>> {
    return this.updatePasswordUseCase.updatePassword(parameters)
  }

  getAccountList(
    parameters: IGetAccountListInputPort
  ): Promise<Either<IErrorOutputPort, IGetAccountListOutputPort>> {
    return this.getAccountListUseCase.getAccountListUseCase(parameters)
  }
}

export default AccountController
