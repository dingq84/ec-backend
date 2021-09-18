import { Either } from 'fp-ts/lib/Either'
import { either } from 'fp-ts'
import { flow } from 'fp-ts/lib/function'

import { IAdminPresenter } from '@/admin/adapter/interface/iAdminPresenter'
import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'
import { IPaginationPresenter } from '@/common/adapter/interface/iPaginationPresenter'
import { IErrorInputPort, IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { IAdminEntity } from '@/admin/domain/interface/iAdminEntity'
import { IPaginationData } from '@/common/adapter/interface/iHttpInfrastructure'
import { IGetAdminListOutputPort } from '@/admin/application/interface/iGetAdminListUseCase'
import { IPaginationInputPort } from '@/common/application/interface/iPaginationUseCase'
import { Status } from '@/common/constants/status'
import { IGetAdminDetailOutputPort } from '@/admin/application/interface/iGetAdminDetailUseCase'

class AdminPresenter implements IAdminPresenter {
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

  getAdminList(
    data: Either<IErrorInputPort, { accounts: IAdminEntity[]; pagination: IPaginationData }>
  ): Either<IErrorOutputPort, IGetAdminListOutputPort> {
    return this.paginationPresenter.present(
      this.errorPresenter.present<IGetAdminListOutputPort>(
        flow(
          either.map(
            (response: { accounts: IAdminEntity[]; pagination: IPaginationInputPort }) => ({
              ...response,
              accounts: response.accounts.map(account => ({
                id: account.id,
                name: account.name,
                account: account.account,
                status: account.status,
                createdAt: account.createdAt,
                updatedAt: account.updatedAt,
                statusText: this.getStatusText(account.status),
                role: account.roles[0]?.name || ''
              }))
            })
          )
        )(data)
      )
    )
  }

  getAdminDetail(
    data: Either<IErrorInputPort, IAdminEntity>
  ): Either<IErrorOutputPort, IGetAdminDetailOutputPort> {
    return this.errorPresenter.present<IGetAdminDetailOutputPort>(
      flow(
        either.map((admin: IAdminEntity) => ({
          id: admin.id,
          name: admin.name,
          account: admin.account,
          status: admin.status,
          roleId: admin.roles[0].id
        }))
      )(data)
    )
  }
}

export default AdminPresenter
