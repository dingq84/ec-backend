import { Either } from 'fp-ts/lib/Either'
import { either } from 'fp-ts'
import { flow } from 'fp-ts/lib/function'

import { IMeRepository } from '@/auth/domains/useCases/repositories-interfaces/IMe'
import MeDTO, { IMeDTO, IMeParameters } from '@/auth/domains/dto/MeDTO'
import { ApiUrl } from '@/common/constants/api'
import { IHttp, ResponseResult } from '@/common/adapters/infrastructures/interfaces/IHttp'
import { IErrorDTO, IErrorParameters } from '@/common/domains/dto/ErrorDTO'
import MeErrorDTO from '@/auth/domains/dto/MeErrorDTO'

class MeRepository implements IMeRepository {
  constructor(private readonly http: IHttp) {}

  async getMe(): Promise<Either<IErrorDTO, IMeDTO>> {
    const result = await this.http.request<IMeParameters>({
      url: ApiUrl.me,
      method: 'POST',
      withAuth: true
    })

    return flow(
      (data: Either<IErrorParameters, ResponseResult<IMeParameters>>) =>
        either.mapLeft((error: IErrorParameters) => new MeErrorDTO(error))<
          ResponseResult<IMeParameters>
        >(data),
      either.map((response: ResponseResult<IMeParameters>) => new MeDTO(response.data))
    )(result)
  }
}

export default MeRepository
