import { IAuthPresenter } from '@/auth/adapter/interface/iAuthPresenter'
import { IErrorPresenter } from '@/common/adapter/interface/iErrorPresenter'
import { IPaginationPresenter } from '@/common/adapter/interface/iPaginationPresenter'
import { IPermissionPresenter } from '@/permission/adapter/interface/iPermissionPresenter'
import { IRolePresenter } from '@/role/adapter/interface/iRolePresenter'

export interface IPresenters {
  auth: IAuthPresenter
  role: IRolePresenter
  permission: IPermissionPresenter
  error: {
    admin: IErrorPresenter
    auth: IErrorPresenter
    default: IErrorPresenter
    role: IErrorPresenter
  }
  pagination: IPaginationPresenter
}
