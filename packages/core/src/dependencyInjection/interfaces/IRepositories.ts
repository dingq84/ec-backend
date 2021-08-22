// interfaces
import { IAccountRepository } from '@/admin/domains/useCases/repositories-interfaces/IAccount'
import { IMeRepository } from '@/auth/domains/useCases/repositories-interfaces/IMe'
import { ITokenRepository } from '@/auth/domains/useCases/repositories-interfaces/IToken'

export interface IRepositories {
  auth: {
    token: ITokenRepository
    me: IMeRepository
  }
  admin: {
    account: IAccountRepository
  }
}
