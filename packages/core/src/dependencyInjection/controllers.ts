import AdminController from '@/admin/adapter/AdminController'
import AuthController from '@/auth/adapter/AuthController'
import { IControllers } from '@/dependencyInjection/interface/iController'
import { IUseCases } from '@/dependencyInjection/interface/iUseCases'
import PermissionController from '@/permission/adapter/PermissionController'
import RoleController from '@/role/adapter/RoleController'

function createControllers(useCases: IUseCases): IControllers {
  return {
    admin: new AdminController(
      useCases.admin.updatePassword,
      useCases.admin.getAdminList,
      useCases.admin.createAdmin,
      useCases.admin.updateAdmin,
      useCases.admin.updateAdminStatus,
      useCases.admin.deleteAdmin,
      useCases.admin.getAdminDetail
    ),
    auth: new AuthController(
      useCases.auth.login,
      useCases.auth.logout,
      useCases.auth.refreshToken,
      useCases.auth.getMe,
      useCases.auth.getAccessToken,
      useCases.auth.checkIsLogged,
      useCases.auth.removeRefreshToken
    ),
    role: new RoleController(
      useCases.role.getRoleList,
      useCases.role.updateRoleStatus,
      useCases.role.deleteRole,
      useCases.role.createRole,
      useCases.role.getRoleDetail,
      useCases.role.updateRole,
      useCases.role.getRoleAdminList
    ),
    permission: new PermissionController(useCases.permission.getPermissionList)
  }
}

export default createControllers
