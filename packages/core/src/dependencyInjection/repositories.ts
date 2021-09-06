import { IInfrastructures } from '@/dependencyInjection/interfaces/IInfrastructures'
import { IRepositories } from '@/dependencyInjection/interfaces/IRepositories'
import AccountRepository from '@/admin/adapters/repositories/Account'
import MeRepository from '@/auth/adapters/repositories/Me'
import PermissionRepository from '@/permission/adapters/repositories/Permission'
import RoleRepository from '@/role/adapters/repositories/Role'
import TokenRepository from '@/auth/adapters/repositories/Token'

function createRepositories(infrastructures: IInfrastructures): IRepositories {
  return {
    auth: {
      token: new TokenRepository(infrastructures.storage, infrastructures.http),
      me: new MeRepository(infrastructures.http)
    },
    admin: {
      account: new AccountRepository(infrastructures.http)
    },
    permission: new PermissionRepository(infrastructures.http),
    role: new RoleRepository(infrastructures.http)
  }
}

export default createRepositories
