import { either } from 'fp-ts'
import { Either } from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'

import { IRolePresenter } from '@/role/adapter/interface/iRolePresenter'
import { IGetRoleListOutputPort } from '@/role/application/interface/iGetRoleListUseCase'
import { IRoleEntity, Status } from '@/role/domain/interface/iRoleEntity'
import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'
import { IPaginationPresenter } from '@/common/adapter/interface/iPaginationPresenter'
import { IErrorInputPort, IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { IPaginationInputPort } from '@/common/application/interface/iPaginationUseCase'
import { IGetRoleDetailOutputPort } from '@/role/application/interface/iGetRoleDetailUseCase'
import { IGetRoleAccountListOutputPort } from '../application/interface/iGetRoleAccountListUseCase'
import { IAccountEntity } from '@/admin/domain/interface/iAccountEntity'

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
    data: Either<IErrorInputPort, { roles: IRoleEntity[]; pagination: IPaginationInputPort }>
  ): Either<IErrorOutputPort, IGetRoleListOutputPort> {
    return this.paginationPresenter.present(
      this.errorPresenter.present<IGetRoleListOutputPort>(
        flow(
          either.map((response: { roles: IRoleEntity[]; pagination: IPaginationInputPort }) => ({
            ...response,
            roles: response.roles.map(role => ({
              id: role.id,
              name: role.name,
              status: role.status,
              permissions: role.permissions,
              createdUser: role.createdUser,
              createdAt: role.createdAt,
              updatedUser: role.updatedUser,
              updatedAt: role.updatedAt,
              statusText: this.getStatusText(role.status)
            }))
          }))
        )(data)
      )
    )
  }

  getRoleDetail(
    data: Either<IErrorInputPort, IRoleEntity>
  ): Either<IErrorOutputPort, IGetRoleDetailOutputPort> {
    return this.errorPresenter.present<IGetRoleDetailOutputPort>(
      flow(
        either.map((role: IRoleEntity) => ({
          id: role.id,
          name: role.name,
          status: role.status,
          permissions: role.permissions,
          createdUser: role.createdUser,
          createdAt: role.createdAt,
          updatedUser: role.updatedUser,
          updatedAt: role.updatedAt,
          statusText: this.getStatusText(role.status)
        }))
      )(data)
    )
  }

  getRoleAccountList(
    data: Either<IErrorInputPort, { accounts: Array<Pick<IAccountEntity, 'id' | 'name'>> }>
  ): Either<IErrorOutputPort, IGetRoleAccountListOutputPort> {
    return this.errorPresenter.present<IGetRoleAccountListOutputPort>(
      flow(
        either.map((data: { accounts: Array<Pick<IAccountEntity, 'id' | 'name'>> }) => ({
          accounts: data.accounts.map(account => ({ id: account.id, name: account.name }))
        }))
      )(data)
    )
  }
}

export default RolePresenter
