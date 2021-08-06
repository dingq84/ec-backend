import { Either } from 'fp-ts/lib/Either'

import { IMeDTO } from '@/auth/domains/dto/MeDTO'
import { IMeUseCase } from '@/auth/domains/useCases/interfaces/IMe'
import { IMePresenter } from '@/auth/adapters/presenters/interfaces/IMe'
import { DataError } from '@/common/types/DataError'

class MePresenter implements IMePresenter {
  constructor(private readonly meUseCase: IMeUseCase) {}

  async getMe(): Promise<Either<DataError, IMeDTO>> {
    return await this.meUseCase.getMe()
  }
}

export default MePresenter
