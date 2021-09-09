import { Either } from 'fp-ts/lib/Either'

import { IErrorInputPort } from '@/common/application/interface/iErrorUseCase'

export interface UpdatePasswordParameter {
  id: number
  passwordOld: string
  passwordNew: string
}

export interface IAccountRepository {
  updatePassword(parameters: UpdatePasswordParameter): Promise<Either<IErrorInputPort, void>>
}
