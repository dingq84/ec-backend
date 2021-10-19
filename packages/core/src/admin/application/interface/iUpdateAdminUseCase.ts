import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { Status } from '@/common/constants/status'

export interface IUpdateAdminInputPort {
  id: number
  name: string
  account: string
  status: Status
  roleId: number
}

export interface IUpdateAdminUseCase {
  updateAdmin(parameters: IUpdateAdminInputPort): Promise<Either<IErrorOutputPort, void>>
}
