import { Either } from 'fp-ts/lib/Either'
import { either } from 'fp-ts'
import { flow } from 'fp-ts/lib/function'

import { IMeRepository } from '@/auth/domains/useCases/repositories-interfaces/IMe'
import MeDTO, { IMeParameters } from '@/auth/domains/dto/MeDTO'
import { ApiUrl } from '@/common/constants/api'
import { DataError } from '@/common/types/DataError'
import { IHttp, ResponseResult } from '@/common/adapters/infrastructures/interfaces/IHttp'

class MeRepository implements IMeRepository {
  constructor(private readonly http: IHttp) {}

  async getMe(): Promise<Either<DataError, IMeParameters>> {
    const result = await this.http.request<IMeParameters>({
      url: ApiUrl.me,
      method: 'POST',
      withAuth: true
    })

    return flow(either.map((response: ResponseResult<IMeParameters>) => new MeDTO(response.data)))(
      result
    )
  }
}

export default MeRepository
