import { Either } from 'fp-ts/lib/Either'

import { IMeDTO } from '@/auth/domains/dto/MeDTO'
import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'

export interface IMeRepository {
  getMe(): Promise<Either<IErrorDTO, IMeDTO>>
}
