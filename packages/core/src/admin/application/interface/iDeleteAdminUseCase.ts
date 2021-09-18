import { Either } from 'fp-ts/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'

export interface IDeleteAdminInputPort {
  id: number
}

export interface IDeleteAdminUseCase {
  deleteAdmin(parameters: IDeleteAdminInputPort): Promise<Either<IErrorOutputPort, void>>
}
