import { Either } from 'fp-ts/lib/Either'

import { IAccountUseCase } from '@/admin/domains/useCases/interfaces/IAccount'
import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'
import { IAccountDTO } from '../dto/AccountDTO'
import { IAccountRepository } from '@/admin/domains/useCases/repositories-interfaces/IAccount'

class AccountUseCase implements IAccountUseCase {
  constructor(private readonly accountRepository: IAccountRepository) {}

  updatePassword(parameter: IAccountDTO): Promise<Either<IErrorDTO, void>> {
    return this.accountRepository.updatePassword(parameter)
  }
}

export default AccountUseCase
