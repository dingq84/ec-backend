import MeUseCase from '@/auth/domains/useCases/Me'
import TokenUseCases from '@/auth/domains/useCases/Token'
import { IUseCases } from '@/dependencyInjection/interfaces/IUseCases'
import { IRepositories } from '@/dependencyInjection/interfaces/IRepositories'
import AccountUseCase from '@/admin/domains/useCases/Account'
import RoleUseCase from '@/role/domains/useCases/IRole'

function createUseCases(repositories: IRepositories): IUseCases {
  return {
    auth: {
      token: new TokenUseCases(repositories.auth.token),
      me: new MeUseCase(repositories.auth.me)
    },
    admin: {
      account: new AccountUseCase(repositories.admin.account)
    },
    role: new RoleUseCase(repositories.role)
  }
}

export default createUseCases
