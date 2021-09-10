import { IHttpInfrastructure, ResponseResult } from '@/common/adapter/interface/iHttpInfrastructure'
import {
  IAccountRepository,
  IAccountRepositoryParameters
} from '@/admin/application/repository-interface/iAccountRepository'
import { Either } from 'fp-ts/lib/Either'
import { IErrorInputPort } from '@/common/application/interface/iErrorUseCase'
import { ApiUrl } from '@/common/constants/api'
import { flow } from 'fp-ts/lib/function'
import { either } from 'fp-ts'

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
}

export default AccountRepository
