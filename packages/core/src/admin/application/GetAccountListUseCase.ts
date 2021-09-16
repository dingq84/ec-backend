import { Either } from 'fp-ts/lib/Either'

import {
  IGetAccountListInputPort,
  IGetAccountListOutputPort,
  IGetAccountListUseCase
} from '@/admin/application/interface/iGetAccountListUseCase'
import {
  IAccountRepository,
  IAccountRepositoryParameters
} from '@/admin/application/repository-interface/iAccountRepository'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { Status } from '@/common/constants/status'
import { IAccountPresenter } from '@/admin/adapter/interface/iAccountPresenter'

class GetAccountListUseCase implements IGetAccountListUseCase {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly accountPresenter: IAccountPresenter
  ) {}

  async getAccountListUseCase(
    parameters: IGetAccountListInputPort
  ): Promise<Either<IErrorOutputPort, IGetAccountListOutputPort>> {
    const newParameter: IAccountRepositoryParameters['getAccountList'] = {
      orderBy: parameters.orderBy,
      page: parameters.page,
      orderField: 'created_at'
    }
    // status, keyword 和 roleId 為選填，如果不合法或空值，則不添加到 api call parameter
    if (
      parameters.status !== undefined &&
      [Status.active, Status.delete, Status.inactive].includes(parameters.status)
    ) {
      newParameter.status = parameters.status
    }

    if (parameters.keyword) {
      newParameter.keyword = parameters.keyword
    }

    if (parameters.roleId !== undefined) {
      newParameter.roleId = parameters.roleId
    }

    const accountEntities = await this.accountRepository.getAccountList(newParameter)
    return this.accountPresenter.getAccountList(accountEntities)
  }
}

export default GetAccountListUseCase
