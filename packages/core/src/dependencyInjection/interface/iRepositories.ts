import { IAdminRepository } from '@/admin/application/repository-interface/iAdminRepository'
import { IAuthRepository } from '@/auth/application/repository-interface/iAuthRepository'
import { IPermissionRepository } from '@/permission/application/repository-interface/iPermissionRepository'
import { IRoleRepository } from '@/role/application/repository-interface/iRoleRepository'

export interface IRepositories {
  admin: IAdminRepository
  auth: IAuthRepository
  role: IRoleRepository
  permission: IPermissionRepository
}
