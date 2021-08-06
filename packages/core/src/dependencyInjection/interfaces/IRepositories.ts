// interfaces
import { IMeRepository } from '@/auth/domains/useCases/repositories-interfaces/IMe'
import { ITokenRepository } from '@/auth/domains/useCases/repositories-interfaces/IToken'

export interface IRepositories {
  auth: {
    token: ITokenRepository
    me: IMeRepository
  }
}
