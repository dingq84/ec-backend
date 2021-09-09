import { either } from 'fp-ts'
import { Either } from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'

import { IRolePresenter } from '@/role/adapter/interface/iRolePresenter'
import { IGetRoleListOutputPort } from '@/role/application/interface/iGetRoleListUseCase'
import { IRoleEntity, Status } from '@/role/domain/interface/iRoleEntity'
import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'
import { IPaginationPresenter } from '@/common/adapter/interface/iPaginationPresenter'
import { IErrorInputPort, IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import {
  IPaginationInputPort,
  IPaginationOutputPort
} from '@/common/application/interface/iPaginationUseCase'

class RolePresenter implements IRolePresenter {
  constructor(
    private readonly errorPresenter: IErrorPresenter,
    private readonly paginationPresenter: IPaginationPresenter
  ) {}
  private getStatusText(status: Status): string {
    switch (status) {
      case 0:
        return '停用'
      case 1:
        return '啟用'
      default:
        return '停用'
    }
  }

  getRoleList(
    data: Either<IErrorInputPort, { roles: IRoleEntity[]; pagination: IPaginationOutputPort }>
  ): Either<IErrorOutputPort, IGetRoleListOutputPort> {
    return this.paginationPresenter.present(
      this.errorPresenter.present<IGetRoleListOutputPort>(
        flow(
          either.map((response: { roles: IRoleEntity[]; pagination: IPaginationInputPort }) => ({
            ...response,
            roles: response.roles.map(role => ({
              ...role,
              statusText: this.getStatusText(role.status)
            }))
          }))
        )(data)
      )
    )
  }
}

export default RolePresenter
