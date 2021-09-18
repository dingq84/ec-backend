import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { IPaginationOutputPort } from '@/common/application/interface/iPaginationUseCase'
import { Order } from '@/common/constants/order'
import { Status } from '@/common/constants/status'

export interface IGetAdminOutputPort {
  id: number
  name: string
  account: string
  status: Status
  createdAt: string
  role: string
  statusText: string
}

export interface IGetAdminListInputPort {
  status?: Status
  keyword?: string
  orderBy: Order
  page: number
  roleId?: number
}

export interface IGetAdminListOutputPort {
  accounts: IGetAdminOutputPort[]
  pagination: IPaginationOutputPort
}

export interface IGetAdminListUseCase {
  getAdminListUseCase(
    parameters: IGetAdminListInputPort
  ): Promise<Either<IErrorOutputPort, IGetAdminListOutputPort>>
}
