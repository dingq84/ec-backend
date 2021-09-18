import { IAdminController } from '@/admin/adapter/interface/iAdminController'
import { IAuthController } from '@/auth/adapter/interface/iAuthController'
import { IPermissionController } from '@/permission/adapter/interface/iPermissionController'
import { IRoleController } from '@/role/adapter/interface/iRoleController'

export interface IControllers {
  admin: IAdminController
  auth: IAuthController
  permission: IPermissionController
  role: IRoleController
}
