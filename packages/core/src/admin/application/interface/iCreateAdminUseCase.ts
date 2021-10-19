import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { Status } from '@/common/constants/status'

export interface ICreateAdminInputPort {
  name: string
  account: string
  password: string
  status: Status
  roleId: number
}

export interface ICreateAdminUseCase {
  createAdmin(parameters: ICreateAdminInputPort): Promise<Either<IErrorOutputPort, void>>
}
