import { Either } from 'fp-ts/lib/Either'

import { IErrorInputPort } from '@/common/application/interface/iErrorUseCase'

export interface IAccountRepositoryParameters {
  updatePassword: {
    id: number
    passwordOld: string
    passwordNew: string
  }
}

export interface IAccountRepository {
  updatePassword(
    parameters: IAccountRepositoryParameters['updatePassword']
  ): Promise<Either<IErrorInputPort, void>>
}
