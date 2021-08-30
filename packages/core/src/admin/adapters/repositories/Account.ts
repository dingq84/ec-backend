import { Either } from 'fp-ts/lib/Either'
import { either } from 'fp-ts'
import { flow } from 'fp-ts/lib/function'

import { IAccountDTO } from '@/admin/domains/dto/AccountDTO'
import { IAccountRepository } from '@/admin/domains/useCases/repositories-interfaces/IAccount'
import { IHttp, ResponseResult } from '@/common/adapters/infrastructures/interfaces/IHttp'
import { ApiUrl } from '@/common/constants/api'
import { IErrorDTO, IErrorParameters } from '@/common/domains/dto/ErrorDTO'
import AccountErrorDTO from '@/admin/domains/dto/AccountErrorDTO'

class AccountRepository implements IAccountRepository {
  constructor(private readonly http: IHttp) {}

  async updatePassword(parameter: IAccountDTO): Promise<Either<IErrorDTO, void>> {
    const result = await this.http.request<void>({
      url: ApiUrl.updatePassword,
      method: 'PATCH',
      data: parameter,
      withAuth: true
    })

    return flow(
      (data: Either<IErrorParameters, ResponseResult<void>>) =>
        either.mapLeft((error: IErrorParameters) => new AccountErrorDTO(error))<
          ResponseResult<void>
        >(data),
      either.map((response: ResponseResult<void>) => response.data)
    )(result)
  }
}

export default AccountRepository
