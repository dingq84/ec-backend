import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'
import { Either } from 'fp-ts/lib/Either'
import { IAccountDTO } from '@/admin/domains/dto/AccountDTO'

export interface IAccountRepository {
  updatePassword(parameter: IAccountDTO): Promise<Either<IErrorDTO, void>>
}
