import AdminErrorPresenter from '@/admin/adapter/AdminErrorPresenter'
import AdminPresenter from '@/admin/adapter/AdminPresenter'
import AuthErrorPresenter from '@/auth/adapter/AuthErrorPresenter'
import AuthPresenter from '@/auth/adapter/AuthPresenter'
import ErrorPresenter from '@/common/adapter/ErrorPresenter'
import FormatPresenter from '@/common/adapter/FormatPresenter'
import PaginationPresenter from '@/common/adapter/PaginationPresenter'
import { IPresenters } from '@/dependencyInjection/interface/iPresenters'
import PermissionPresenter from '@/permission/adapter/PermissionPresenter'
import RoleErrorPresenter from '@/role/adapter/RoleErrorPresenter'
import RolePresenter from '@/role/adapter/RolePresenter'

function createPresenters(): IPresenters {
  const errorPresenter = new ErrorPresenter()
  const paginationPresenter = new PaginationPresenter()
  const formatPresenter = new FormatPresenter()
  const authErrorPresenter = new AuthErrorPresenter()
  const roleErrorPresenter = new RoleErrorPresenter()

  return {
    admin: new AdminPresenter(errorPresenter, paginationPresenter, formatPresenter),
    auth: new AuthPresenter(authErrorPresenter),
    role: new RolePresenter(roleErrorPresenter, paginationPresenter, formatPresenter),
    permission: new PermissionPresenter(errorPresenter),
    error: {
      admin: new AdminErrorPresenter(),
      auth: authErrorPresenter,
      default: errorPresenter,
      role: roleErrorPresenter
    },
    pagination: paginationPresenter
  }
}

export default createPresenters
