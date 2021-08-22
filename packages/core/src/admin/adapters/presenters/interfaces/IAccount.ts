import { Either } from 'fp-ts/lib/Either'

import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'
import { IAccountParameters } from '@/admin/domains/dto/AccountDTO'

export interface IAccountPresenter {
  updatePassword(parameter: IAccountParameters): Promise<Either<IErrorDTO, void>>
}
