import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { Status } from '@/common/constants/status'

export interface IUpdateAdminStatusInputPort {
  id: number
  status: Status
}

export interface IUpdateAdminStatusUseCase {
  updateAdminStatus(
    parameters: IUpdateAdminStatusInputPort
  ): Promise<Either<IErrorOutputPort, void>>
}
