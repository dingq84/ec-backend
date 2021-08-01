// interfaces
import { ITokenRepository } from '@ec-backend/core/src/auth/domains/useCases/repositories-interfaces/IToken'

export interface IRepositories {
  token: ITokenRepository
}
