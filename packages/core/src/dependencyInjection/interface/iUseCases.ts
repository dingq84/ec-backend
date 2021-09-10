import { IUpdatePasswordUseCase } from '@/admin/application/interface/iUpdatePasswordUseCase'
import { ICheckIsLoggedUseCase } from '@/auth/application/interface/iCheckIsLoggedUseCase'
import { IGetAccessTokenUseCase } from '@/auth/application/interface/iGetAccessTokenUseCase'
import { IGetMeUseCase } from '@/auth/application/interface/iGetMeUseCase'
import { ILoginUseCase } from '@/auth/application/interface/iLoginUseCase'
import { ILogoutUseCase } from '@/auth/application/interface/iLogoutUseCase'
import { IRefreshTokenUseCase } from '@/auth/application/interface/iRefreshTokenUseCase'
import { IGetPermissionListUseCase } from '@/permission/application/interface/iGetPermissionListUseCase'
import { ICreateRoleUseCase } from '@/role/application/interface/iCreateRoleUseCase'
import { IDeleteRoleUseCase } from '@/role/application/interface/iDeleteRoleUseCase'
import { IGetRoleListUseCase } from '@/role/application/interface/iGetRoleListUseCase'
import { IUpdateRoleStatusUseCase } from '@/role/application/interface/iUpdateRoleStatusUseCase'

export interface IUseCases {
  admin: {
    updatePassword: IUpdatePasswordUseCase
  }
  auth: {
    login: ILoginUseCase
    logout: ILogoutUseCase
    refreshToken: IRefreshTokenUseCase
    getMe: IGetMeUseCase
    getAccessToken: IGetAccessTokenUseCase
    checkIsLogged: ICheckIsLoggedUseCase
  }
  role: {
    getRoleList: IGetRoleListUseCase
    updateRoleStatus: IUpdateRoleStatusUseCase
    deleteRole: IDeleteRoleUseCase
    createRole: ICreateRoleUseCase
  }
  permission: {
    getPermissionList: IGetPermissionListUseCase
  }
}
