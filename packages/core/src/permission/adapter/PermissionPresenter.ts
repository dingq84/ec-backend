import { Either } from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'
import { either } from 'fp-ts'

import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'
import { IErrorInputPort, IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { IGetPermissionListOutputPort } from '@/permission/application/interface/iGetPermissionListUseCase'
import { IPermissionPresenter } from '@/permission/adapter/interface/iPermissionPresenter'
import { IPermissionEntity } from '@/permission/domain/interface/iPermissionEntity'

class PermissionPresenter implements IPermissionPresenter {
  constructor(private readonly errorPresenter: IErrorPresenter) {}

  getPermissionList(
    data: Either<IErrorInputPort, IPermissionEntity[]>
  ): Either<IErrorOutputPort, IGetPermissionListOutputPort[]> {
    return this.errorPresenter.present<IGetPermissionListOutputPort[]>(
      flow(
        either.map((response: IPermissionEntity[]) =>
          response.map(permission => ({ id: permission.id, name: permission.name }))
        )
      )(data)
    )
  }
}

export default PermissionPresenter
