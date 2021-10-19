import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'

export interface ILogoutUseCase {
  logout(): Promise<Either<IErrorOutputPort, void>>
}
