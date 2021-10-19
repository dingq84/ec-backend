import AdminRepository from '@/admin/data/AdminRepository'
import AuthRepository from '@/auth/data/AuthRepository'
import { IInfrastructures } from '@/dependencyInjection/interface/iInfrastructures'
import { IRepositories } from '@/dependencyInjection/interface/iRepositories'
import PermissionRepository from '@/permission/data/PermissionRepository'
import RoleRepository from '@/role/data/RoleRepository'

function createRepositories(infrastructures: IInfrastructures): IRepositories {
  return {
    admin: new AdminRepository(infrastructures.http),
    auth: new AuthRepository(infrastructures.http, infrastructures.storage),
    role: new RoleRepository(infrastructures.http),
    permission: new PermissionRepository(infrastructures.http)
  }
}

export default createRepositories
