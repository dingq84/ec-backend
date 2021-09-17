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
import CreateRoleUseCase from '@/role/application/CreateRoleUseCase'
import GetRoleDetailUseCase from '@/role/application/GetRoleDetailUseCase'
import UpdateRoleUseCase from '@/role/application/UpdateRoleUseCase'
import GetRoleAccountListUseCase from '@/role/application/GetRoleAccountListUseCase'
import GetAccountListUseCase from '@/admin/application/GetAccountListUseCase'
import RemoveRefreshTokenUseCase from '@/auth/application/RemoveRefreshTokenUseCase'

function createUseCases(repositories: IRepositories, presenters: IPresenters): IUseCases {
  const refreshTokenUseCase = new RefreshTokenUseCase(
    repositories.auth,
    presenters.auth,
    presenters.error.auth
  )
  const getAccessTokenUseCase = new GetAccessTokenUseCase(repositories.auth)
  const removeRefreshTokenUseCase = new RemoveRefreshTokenUseCase(repositories.auth)

  return {
    admin: {
      updatePassword: new UpdatePasswordUseCase(repositories.admin, presenters.error.admin),
      getAccountList: new GetAccountListUseCase(repositories.admin, presenters.admin)
    },
    auth: {
      login: new LoginUseCase(repositories.auth, presenters.auth, presenters.error.auth),
      logout: new LogoutUseCase(
        removeRefreshTokenUseCase,
        repositories.auth,
        presenters.error.default
      ),
      refreshToken: refreshTokenUseCase,
      getMe: new GetMeUseCase(repositories.auth, presenters.auth),
      getAccessToken: getAccessTokenUseCase,
      checkIsLogged: new CheckIsLoggedUseCase(
        repositories.auth,
        getAccessTokenUseCase,
        refreshTokenUseCase
      ),
      removeRefreshToken: removeRefreshTokenUseCase
    },
    role: {
      getRoleList: new GetRoleListUseCase(repositories.role, presenters.role),
      updateRoleStatus: new UpdateRoleStatusUseCase(repositories.role, presenters.error.role),
      deleteRole: new DeleteRoleUseCase(repositories.role, presenters.error.role),
      createRole: new CreateRoleUseCase(repositories.role, presenters.error.role),
      getRoleDetail: new GetRoleDetailUseCase(
        repositories.role,
        presenters.role,
        presenters.error.role
      ),
      updateRole: new UpdateRoleUseCase(repositories.role, presenters.error.role),
      getRoleAccountList: new GetRoleAccountListUseCase(repositories.role, presenters.role)
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
