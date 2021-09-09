import { Either } from 'fp-ts/lib/Either'

import {
  IUpdatePasswordInputPort,
  IUpdatePasswordUseCase
} from '@/admin/application/interface/iUpdatePasswordUseCase'
import { IAccountController } from '@/admin/adapter/interface/iAccountController'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'

class AccountController implements IAccountController {
  constructor(private readonly updatePasswordUseCase: IUpdatePasswordUseCase) {}

  updatePassword(parameters: IUpdatePasswordInputPort): Promise<Either<IErrorOutputPort, void>> {
    return this.updatePasswordUseCase.updatePassword(parameters)
  }
}

export default AccountController
