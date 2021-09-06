// interfaces
import { IAccountRepository } from '@/admin/domains/useCases/repositories-interfaces/IAccount'
import { IMeRepository } from '@/auth/domains/useCases/repositories-interfaces/IMe'
import { ITokenRepository } from '@/auth/domains/useCases/repositories-interfaces/IToken'
import { IPermissionRepository } from '@/permission/domains/useCases/repositories-interfaces/IPermission'
import { IRoleRepository } from '@/role/domains/useCases/repositories-interfaces/IRole'

export interface IRepositories {
  auth: {
    token: ITokenRepository
    me: IMeRepository
  }
  admin: {
    account: IAccountRepository
  }
  permission: IPermissionRepository
  role: IRoleRepository
}
