import { Either } from 'fp-ts/lib/Either'

import { IMeDTO } from '@/auth/domains/dto/MeDTO'
import { IMeUseCase } from '@/auth/domains/useCases/interfaces/IMe'
import { IMePresenter } from '@/auth/adapters/presenters/interfaces/IMe'
import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'

class MePresenter implements IMePresenter {
  constructor(private readonly meUseCase: IMeUseCase) {}

  getMe(): Promise<Either<IErrorDTO, IMeDTO>> {
    return this.meUseCase.getMe()
  }
}

export default MePresenter
