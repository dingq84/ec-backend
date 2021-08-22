import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'
import { Either } from 'fp-ts/lib/Either'
import { IAccountDTO } from '../../dto/AccountDTO'

export interface IAccountUseCase {
  updatePassword(parameters: IAccountDTO): Promise<Either<IErrorDTO, void>>
}
