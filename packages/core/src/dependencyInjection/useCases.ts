import { IPresenters } from '@/dependencyInjection/interface/iPresenters'
import { IUseCases } from '@/dependencyInjection/interface/iUseCases'
import { IRepositories } from '@/dependencyInjection/interface/iRepositories'
import GerPermissionListUseCase from '@/permission/application/GetPermissionListUseCase'
import GetRoleListUseCase from '@/role/application/GetRoleListUseCase'
import UpdateRoleStatusUseCase from '@/role/application/UpdateRoleStatusUseCase'
import DeleteRoleUseCase from '@/role/application/DeleteRoleUseCase'
import LoginUseCase from '@/auth/application/LoginUseCase'
import LogoutUseCase from '@/auth/application/LogoutUseCase'
import RefreshTokenUseCase from '@/auth/application/RefreshTokenUseCase'
import GetMeUseCase from '@/auth/application/GetMeUseCase'
import GetAccessTokenUseCase from '@/auth/application/GetAccessTokenUseCase'
import CheckIsLoggedUseCase from '@/auth/application/CheckIsLoggedUseCase'
import UpdatePasswordUseCase from '@/admin/application/UpdatePasswordUseCase'

function createUseCases(repositories: IRepositories, presenters: IPresenters): IUseCases {
  const refreshToken = new RefreshTokenUseCase(
    repositories.auth,
    presenters.auth,
    presenters.error.auth
  )
  return {
    admin: {
      updatePassword: new UpdatePasswordUseCase(repositories.admin, presenters.error.admin)
    },
    auth: {
      login: new LoginUseCase(repositories.auth, presenters.auth, presenters.error.auth),
      logout: new LogoutUseCase(repositories.auth, presenters.error.default),
      refreshToken,
      getMe: new GetMeUseCase(repositories.auth, presenters.auth),
      getAccessToken: new GetAccessTokenUseCase(repositories.auth),
      checkIsLogged: new CheckIsLoggedUseCase(repositories.auth, refreshToken)
    },
    role: {
      getRoleList: new GetRoleListUseCase(repositories.role, presenters.role),
      updateRoleStatus: new UpdateRoleStatusUseCase(repositories.role, presenters.error.role),
      deleteRole: new DeleteRoleUseCase(repositories.role, presenters.error.default)
    },
    permission: {
      getPermissionList: new GerPermissionListUseCase(
        repositories.permission,
        presenters.permission
      )
    }
  }
}

export default createUseCases
