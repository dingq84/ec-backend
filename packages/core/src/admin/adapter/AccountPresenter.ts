import { Either } from 'fp-ts/lib/Either'
import { either } from 'fp-ts'
import { flow } from 'fp-ts/lib/function'

import { IAccountPresenter } from '@/admin/adapter/interface/iAccountPresenter'
import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'
import { IPaginationPresenter } from '@/common/adapter/interface/iPaginationPresenter'
import { IErrorInputPort, IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { IAccountEntity } from '@/admin/domain/interface/iAccountEntity'
import { IPaginationData } from '@/common/adapter/interface/iHttpInfrastructure'
import { IGetAccountListOutputPort } from '@/admin/application/interface/iGetAccountListUseCase'
import { IPaginationInputPort } from '@/common/application/interface/iPaginationUseCase'
import { Status } from '@/common/constants/status'

class AccountPresenter implements IAccountPresenter {
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

  getAccountList(
    data: Either<IErrorInputPort, { accounts: IAccountEntity[]; pagination: IPaginationData }>
  ): Either<IErrorOutputPort, IGetAccountListOutputPort> {
    return this.paginationPresenter.present(
      this.errorPresenter.present<IGetAccountListOutputPort>(
        flow(
          either.map(
            (response: { accounts: IAccountEntity[]; pagination: IPaginationInputPort }) => ({
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
}

export default AccountPresenter
