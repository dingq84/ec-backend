// interfaces
import { ITokenRepository } from '@/auth/domains/useCases/repositories-interfaces/IToken'

export interface IRepositories {
  token: ITokenRepository
}
