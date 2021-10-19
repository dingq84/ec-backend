import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'

export interface IDeleteRoleInputPort {
  id: number
}

export interface IDeleteRoleUseCase {
  deleteRole(parameters: IDeleteRoleInputPort): Promise<Either<IErrorOutputPort, void>>
}
