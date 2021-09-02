import AccountRepository from '@/admin/adapters/repositories/Account'
import MeRepository from '@/auth/adapters/repositories/Me'
import TokenRepository from '@/auth/adapters/repositories/Token'
import { IInfrastructures } from '@/dependencyInjection/interfaces/IInfrastructures'
import { IRepositories } from '@/dependencyInjection/interfaces/IRepositories'
import RoleRepository from '@/role/adapters/repositories/IRole'

function createRepositories(infrastructures: IInfrastructures): IRepositories {
  return {
    auth: {
      token: new TokenRepository(infrastructures.storage, infrastructures.http),
      me: new MeRepository(infrastructures.http)
    },
    admin: {
      account: new AccountRepository(infrastructures.http)
    },
    role: new RoleRepository(infrastructures.http)
  }
}

export default createRepositories
