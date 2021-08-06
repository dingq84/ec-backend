// interfaces
import { IMeUseCase } from '@/auth/domains/useCases/interfaces/IMe'
import { ITokenUseCase } from '@/auth/domains/useCases/interfaces/IToken'

export interface IUseCases {
  auth: {
    token: ITokenUseCase
    me: IMeUseCase
  }
}
