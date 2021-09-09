import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { Status } from '@/role/domain/interface/iRoleEntity'

export interface IUpdateRoleStatusInputPort {
  id: number
  status: Status
}

export interface IUpdateRoleStatusUseCase {
  updateRoleStatus(parameters: IUpdateRoleStatusInputPort): Promise<Either<IErrorOutputPort, void>>
}
