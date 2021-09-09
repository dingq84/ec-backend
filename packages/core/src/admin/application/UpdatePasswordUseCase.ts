import { Either, left } from 'fp-ts/lib/Either'
import AccountEntity from '@/admin/domain/AccountEntity'
import {
  IUpdatePasswordInputPort,
  IUpdatePasswordUseCase
} from '@/admin/application/interface/iUpdatePasswordUseCase'
import { IAccountRepository } from '@/admin/application/repository-interface/iAccountRepository'
import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'

class UpdatePasswordUseCase implements IUpdatePasswordUseCase {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly errorPresenter: IErrorPresenter
  ) {}

  async updatePassword(
    parameters: IUpdatePasswordInputPort
  ): Promise<Either<IErrorOutputPort, void>> {
    const result = AccountEntity.updatePasswordValidate(parameters)
    if (result !== true) {
      return this.errorPresenter.present<void>(left(result))
    }

    const { accountId, oldPassword, newPassword1 } = parameters

    return this.errorPresenter.present<void>(
      await this.accountRepository.updatePassword({
        id: accountId,
        passwordOld: oldPassword,
        passwordNew: newPassword1
      })
    )
  }
}

export default UpdatePasswordUseCase
