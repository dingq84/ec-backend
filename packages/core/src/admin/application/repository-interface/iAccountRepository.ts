import { Either } from 'fp-ts/lib/Either'

import { IErrorInputPort } from '@/common/application/interface/iErrorUseCase'
import { Status } from '@/common/constants/status'
import { Order } from '@/common/constants/order'
import { IAccountEntity } from '@/admin/domain/interface/iAccountEntity'
import { IPaginationInputPort } from '@/common/application/interface/iPaginationUseCase'

export interface IAccountRepositoryParameters {
  updatePassword: {
    id: number
    passwordOld: string
    passwordNew: string
  }
  getAccountList: {
    status?: Status
    roleId?: number
    keyword?: string
    orderBy: Order
    page: number
    orderField: 'created_at' | 'updated_at'
  }
}

export interface IAccountRepository {
  updatePassword(
    parameters: IAccountRepositoryParameters['updatePassword']
  ): Promise<Either<IErrorInputPort, void>>
  getAccountList(
    parameters: IAccountRepositoryParameters['getAccountList']
  ): Promise<
    Either<IErrorInputPort, { accounts: IAccountEntity[]; pagination: IPaginationInputPort }>
  >
}
