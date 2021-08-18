import { Either } from 'fp-ts/lib/Either'

import { IMeUseCase } from '@/auth/domains/useCases/interfaces/IMe'
import { IMeRepository } from '@/auth/domains/useCases/repositories-interfaces/IMe'
import { IMeDTO } from '@/auth/domains/dto/MeDTO'
import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'

class MeUseCase implements IMeUseCase {
  constructor(private readonly meRepository: IMeRepository) {}

  async getMe(): Promise<Either<IErrorDTO, IMeDTO>> {
    return await this.meRepository.getMe()
  }
}

export default MeUseCase
