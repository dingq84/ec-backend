import RoleController from '@/role/adapter/RoleController'
import { IControllers } from '@/dependencyInjection/interface/iController'
import { IUseCases } from '@/dependencyInjection/interface/iUseCases'
import PermissionController from '@/permission/adapter/PermissionController'
import AuthController from '@/auth/adapter/AuthController'
import AccountController from '@/admin/adapter/AccountController'

function createControllers(useCases: IUseCases): IControllers {
  return {
    admin: new AccountController(useCases.admin.updatePassword),
    auth: new AuthController(
      useCases.auth.login,
      useCases.auth.logout,
      useCases.auth.refreshToken,
      useCases.auth.getMe,
      useCases.auth.getAccessToken,
      useCases.auth.checkIsLogged
    ),
    role: new RoleController(
      useCases.role.getRoleList,
      useCases.role.updateRoleStatus,
      useCases.role.deleteRole,
      useCases.role.createRole,
      useCases.role.getRoleDetail,
      useCases.role.updateRole
    ),
    permission: new PermissionController(useCases.permission.getPermissionList)
  }
}

export default createControllers
