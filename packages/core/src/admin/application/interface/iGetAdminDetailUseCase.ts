import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { Status } from '@/common/constants/status'

export interface IGetAdminDetailInputPort {
  id: number
}

export interface IGetAdminDetailOutputPort {
  id: number
  name: string
  account: string
  status: Status
  roleId: number
}

export interface IGetAdminDetailUseCase {
  getAdminDetail(
    parameters: IGetAdminDetailInputPort
  ): Promise<Either<IErrorOutputPort, IGetAdminDetailOutputPort>>
}
