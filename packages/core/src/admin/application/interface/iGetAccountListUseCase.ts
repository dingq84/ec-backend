import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { IPaginationOutputPort } from '@/common/application/interface/iPaginationUseCase'
import { Order } from '@/common/constants/order'
import { Status } from '@/common/constants/status'

export interface IGetAccountOutputPort {
  id: number
  name: string
  account: string
  status: Status
  createdAt: string
  role: string
  statusText: string
}

export interface IGetAccountListInputPort {
  status?: Status
  keyword?: string
  orderBy: Order
  page: number
  roleId?: number
}

export interface IGetAccountListOutputPort {
  accounts: IGetAccountOutputPort[]
  pagination: IPaginationOutputPort
}

export interface IGetAccountListUseCase {
  getAccountListUseCase(
    parameters: IGetAccountListInputPort
  ): Promise<Either<IErrorOutputPort, IGetAccountListOutputPort>>
}
