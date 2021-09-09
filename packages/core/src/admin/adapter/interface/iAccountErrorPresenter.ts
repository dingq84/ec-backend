import { Either } from 'fp-ts/lib/Either'

import { ILoginOutputPort } from '@/auth/application/interface/iLoginUseCase'
import { ITokenEntity } from '@/auth/domain/interface/iToken'
import { IErrorInputPort, IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'

export interface IAccountErrorPresenter {
  updatePassword(
    data: Either<IErrorInputPort, ITokenEntity>
  ): Either<IErrorOutputPort, ILoginOutputPort>
}
