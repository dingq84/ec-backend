// interfaces
import { IAccountUseCase } from '@/admin/domains/useCases/interfaces/IAccount'
import { IMeUseCase } from '@/auth/domains/useCases/interfaces/IMe'
import { ITokenUseCase } from '@/auth/domains/useCases/interfaces/IToken'
import { IPermissionUseCase } from '@/permission/domains/useCases/interfaces/IPermission'
import { IRoleUseCase } from '@/role/domains/useCases/interfaces/IRole'

export interface IUseCases {
  auth: {
    token: ITokenUseCase
    me: IMeUseCase
  }
  admin: {
    account: IAccountUseCase
  }
  permission: IPermissionUseCase
  role: IRoleUseCase
}
