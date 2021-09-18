import { Either, left } from 'fp-ts/lib/Either'
import AdminEntity from '@/admin/domain/AdminEntity'
import {
  IUpdatePasswordInputPort,
  IUpdatePasswordUseCase
} from '@/admin/application/interface/iUpdatePasswordUseCase'
import { IAdminRepository } from '@/admin/application/repository-interface/iAdminRepository'
import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'

class UpdatePasswordUseCase implements IUpdatePasswordUseCase {
  constructor(
    private readonly accountRepository: IAdminRepository,
    private readonly errorPresenter: IErrorPresenter
  ) {}

  async updatePassword(
    parameters: IUpdatePasswordInputPort
  ): Promise<Either<IErrorOutputPort, void>> {
    const result = AdminEntity.updatePasswordValidate(parameters)
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
