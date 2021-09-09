import { IAccountController } from '@/admin/adapter/interface/iAccountController'
import { IAuthController } from '@/auth/adapter/interface/iAuthController'
import { IPermissionController } from '@/permission/adapter/interface/iPermissionController'
import { IRoleController } from '@/role/adapter/interface/iRoleController'

export interface IControllers {
  admin: IAccountController
  auth: IAuthController
  permission: IPermissionController
  role: IRoleController
}
