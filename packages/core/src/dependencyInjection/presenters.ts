import AccountErrorPresenter from '@/admin/adapter/AccountErrorPresenter'
import AuthErrorPresenter from '@/auth/adapter/AuthErrorPresenter'
import AuthPresenter from '@/auth/adapter/AuthPresenter'
import ErrorPresenter from '@/common/adapter/ErrorPresenter'
import PaginationPresenter from '@/common/adapter/PaginationPresenter'
import { IPresenters } from '@/dependencyInjection/interface/iPresenters'
import PermissionPresenter from '@/permission/adapter/PermissionPresenter'
import RoleErrorPresenter from '@/role/adapter/RoleErrorPresenter'
import RolePresenter from '@/role/adapter/RolePresenter'

function createPresenters(): IPresenters {
  const errorPresenter = new ErrorPresenter()
  const paginationPresenter = new PaginationPresenter()
  const authErrorPresenter = new AuthErrorPresenter()
  const roleErrorPresenter = new RoleErrorPresenter()

  return {
    auth: new AuthPresenter(authErrorPresenter),
    role: new RolePresenter(roleErrorPresenter, paginationPresenter),
    permission: new PermissionPresenter(errorPresenter),
    error: {
      admin: new AccountErrorPresenter(),
      auth: authErrorPresenter,
      default: errorPresenter,
      role: roleErrorPresenter
    },
    pagination: paginationPresenter
  }
}

export default createPresenters
