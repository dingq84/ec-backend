import { Either } from 'fp-ts/lib/Either'

import { IErrorInputPort, IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { IGetAccountListOutputPort } from '@/admin/application/interface/iGetAccountListUseCase'
import { IAccountEntity } from '@/admin/domain/interface/iAccountEntity'
import { IPaginationData } from '@/common/adapter/interface/iHttpInfrastructure'

export interface IAccountPresenter {
  getAccountList(
    data: Either<IErrorInputPort, { accounts: IAccountEntity[]; pagination: IPaginationData }>
  ): Either<IErrorOutputPort, IGetAccountListOutputPort>
}
