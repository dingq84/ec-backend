import { IGetAccountListUseCase } from '@/admin/application/interface/iGetAccountListUseCase'
import { IUpdatePasswordUseCase } from '@/admin/application/interface/iUpdatePasswordUseCase'
import { ICheckIsLoggedUseCase } from '@/auth/application/interface/iCheckIsLoggedUseCase'
import { IGetAccessTokenUseCase } from '@/auth/application/interface/iGetAccessTokenUseCase'
import { IGetMeUseCase } from '@/auth/application/interface/iGetMeUseCase'
import { ILoginUseCase } from '@/auth/application/interface/iLoginUseCase'
import { ILogoutUseCase } from '@/auth/application/interface/iLogoutUseCase'
import { IRefreshTokenUseCase } from '@/auth/application/interface/iRefreshTokenUseCase'
import { IRemoveRefreshTokenUseCase } from '@/auth/application/interface/iRemoveRefreshTokenUseCase'
import { IGetPermissionListUseCase } from '@/permission/application/interface/iGetPermissionListUseCase'
import { ICreateRoleUseCase } from '@/role/application/interface/iCreateRoleUseCase'
import { IDeleteRoleUseCase } from '@/role/application/interface/iDeleteRoleUseCase'
import { IGetRoleAccountListUseCase } from '@/role/application/interface/iGetRoleAccountListUseCase'
import { IGetRoleDetailUseCase } from '@/role/application/interface/iGetRoleDetailUseCase'
import { IGetRoleListUseCase } from '@/role/application/interface/iGetRoleListUseCase'
import { IUpdateRoleStatusUseCase } from '@/role/application/interface/iUpdateRoleStatusUseCase'
import { IUpdateRoleUseCase } from '@/role/application/interface/iUpdateRoleUseCase'

export interface IUseCases {
  admin: {
    updatePassword: IUpdatePasswordUseCase
    getAccountList: IGetAccountListUseCase
  }
  auth: {
    login: ILoginUseCase
    logout: ILogoutUseCase
    refreshToken: IRefreshTokenUseCase
    getMe: IGetMeUseCase
    getAccessToken: IGetAccessTokenUseCase
    checkIsLogged: ICheckIsLoggedUseCase
    removeRefreshToken: IRemoveRefreshTokenUseCase
  }
  role: {
    getRoleList: IGetRoleListUseCase
    updateRoleStatus: IUpdateRoleStatusUseCase
    deleteRole: IDeleteRoleUseCase
    createRole: ICreateRoleUseCase
    getRoleDetail: IGetRoleDetailUseCase
    updateRole: IUpdateRoleUseCase
    getRoleAccountList: IGetRoleAccountListUseCase
  }
  permission: {
    getPermissionList: IGetPermissionListUseCase
  }
}
