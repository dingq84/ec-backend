import { either } from 'fp-ts'
import { Either } from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'

import { IAuthPresenter } from '@/auth/adapter/interface/iAuthPresenter'
import { ILoginOutputPort } from '@/auth/application/interface/iLoginUseCase'
import { IMeEntity } from '@/auth/domain/interface/iMe'
import { ITokenEntity } from '@/auth/domain/interface/iToken'
import { IGetMeOutPort } from '@/auth/application/interface/iGetMeUseCase'
import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'
import { IErrorInputPort, IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'

class AuthPresenter implements IAuthPresenter {
  constructor(private readonly errorPresenter: IErrorPresenter) {}

  login(data: Either<IErrorInputPort, ITokenEntity>): Either<IErrorOutputPort, ILoginOutputPort> {
    return this.errorPresenter.present<ILoginOutputPort>(
      flow(either.map((tokenEntity: ITokenEntity) => ({ accessToken: tokenEntity.accessToken })))(
        data
      )
    )
  }

  refreshToken(
    data: Either<IErrorInputPort, ITokenEntity>
  ): Either<IErrorOutputPort, ILoginOutputPort> {
    return this.errorPresenter.present<ILoginOutputPort>(
      flow(either.map((tokenEntity: ITokenEntity) => ({ accessToken: tokenEntity.accessToken })))(
        data
      )
    )
  }

  getMe(data: Either<IErrorInputPort, IMeEntity>): Either<IErrorOutputPort, IGetMeOutPort> {
    return this.errorPresenter.present<IGetMeOutPort>(
      flow(
        either.map((meEntity: IMeEntity) => ({
          menu: meEntity.menu,
          role: meEntity.role,
          user: meEntity.user
        }))
      )(data)
    )
  }
}

export default AuthPresenter
