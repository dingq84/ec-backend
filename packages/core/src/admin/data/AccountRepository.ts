import { flow } from 'fp-ts/lib/function'
import { Either } from 'fp-ts/lib/Either'
import { either } from 'fp-ts'

import { IHttpInfrastructure, ResponseResult } from '@/common/adapter/interface/iHttpInfrastructure'
import {
  IAccountRepository,
  IAccountRepositoryParameters
} from '@/admin/application/repository-interface/iAccountRepository'
import AccountEntity from '@/admin/domain/AccountEntity'
import { IAccountData, IAccountEntity } from '@/admin/domain/interface/iAccountEntity'
import { IErrorInputPort } from '@/common/application/interface/iErrorUseCase'
import { ApiUrl } from '@/common/constants/api'
import { IPaginationInputPort } from '@/common/application/interface/iPaginationUseCase'

class AccountRepository implements IAccountRepository {
  constructor(private readonly http: IHttpInfrastructure) {}

  async updatePassword(
    parameters: IAccountRepositoryParameters['updatePassword']
  ): Promise<Either<IErrorInputPort, void>> {
    const result = await this.http.request<void>({
      url: ApiUrl.updatePassword,
      method: 'PATCH',
      data: parameters,
      withAuth: true
    })

    return flow(either.map((response: ResponseResult<void>) => response.data))(result)
  }

  async getAccountList(
    parameters: IAccountRepositoryParameters['getAccountList']
  ): Promise<
    Either<IErrorInputPort, { accounts: IAccountEntity[]; pagination: IPaginationInputPort }>
  > {
    const result = await this.http.request<IPaginationInputPort & { data: IAccountData[] }>({
      url: ApiUrl.adminList,
      method: 'GET',
      params: parameters,
      withAuth: true,
      data: {}
    })

    return flow(
      either.map((response: ResponseResult<IPaginationInputPort & { data: IAccountData[] }>) => {
        const { data, ...restData } = response.data
        return {
          accounts: data.map(role => new AccountEntity(role)),
          pagination: restData
        }
      })
    )(result)
  }
}
export default AccountRepository
