import { Either } from 'fp-ts/lib/Either'

import {
  IGetAdminListInputPort,
  IGetAdminListOutputPort,
  IGetAdminListUseCase
} from '@/admin/application/interface/iGetAdminListUseCase'
import {
  IAdminRepository,
  IAdminRepositoryParameters
} from '@/admin/application/repository-interface/iAdminRepository'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { Status } from '@/common/constants/status'
import { IAdminPresenter } from '@/admin/adapter/interface/iAdminPresenter'

class GetAdminListUseCase implements IGetAdminListUseCase {
  constructor(
    private readonly accountRepository: IAdminRepository,
    private readonly accountPresenter: IAdminPresenter
  ) {}

  async getAdminListUseCase(
    parameters: IGetAdminListInputPort
  ): Promise<Either<IErrorOutputPort, IGetAdminListOutputPort>> {
    const newParameter: IAdminRepositoryParameters['getAdminList'] = {
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

    const accountEntities = await this.accountRepository.getAdminList(newParameter)
    return this.accountPresenter.getAdminList(accountEntities)
  }
}

export default GetAdminListUseCase
