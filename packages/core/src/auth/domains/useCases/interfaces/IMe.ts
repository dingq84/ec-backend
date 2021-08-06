import { Either } from 'fp-ts/lib/Either'

import { IMeDTO } from '@/auth/domains/dto/MeDTO'
import { DataError } from '@/common/types/DataError'

export interface IMeUseCase {
  getMe(): Promise<Either<DataError, IMeDTO>>
}
