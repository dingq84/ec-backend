import { ICreateAdminUseCase } from '@/admin/application/interface/iCreateAdminUseCase'
import { IDeleteAdminUseCase } from '@/admin/application/interface/iDeleteAdminUseCase'
import { IGetAdminDetailUseCase } from '@/admin/application/interface/iGetAdminDetailUseCase'
import { IGetAdminListUseCase } from '@/admin/application/interface/iGetAdminListUseCase'
import { IUpdateAdminStatusUseCase } from '@/admin/application/interface/iUpdateAdminStatusUseCase'
import { IUpdateAdminUseCase } from '@/admin/application/interface/iUpdateAdminUseCase'
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
import { IGetRoleAdminListUseCase } from '@/role/application/interface/iGetRoleAdminListUseCase'
import { IGetRoleDetailUseCase } from '@/role/application/interface/iGetRoleDetailUseCase'
import { IGetRoleListUseCase } from '@/role/application/interface/iGetRoleListUseCase'
import { IUpdateRoleStatusUseCase } from '@/role/application/interface/iUpdateRoleStatusUseCase'
import { IUpdateRoleUseCase } from '@/role/application/interface/iUpdateRoleUseCase'

export interface IUseCases {
  admin: {
    updatePassword: IUpdatePasswordUseCase
    getAdminList: IGetAdminListUseCase
    createAdmin: ICreateAdminUseCase
    updateAdminStatus: IUpdateAdminStatusUseCase
    getAdminDetail: IGetAdminDetailUseCase
    deleteAdmin: IDeleteAdminUseCase
    updateAdmin: IUpdateAdminUseCase
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
    getRoleAdminList: IGetRoleAdminListUseCase
  }
  permission: {
    getPermissionList: IGetPermissionListUseCase
  }
}
