import { IPresenters } from '@/dependencyInjection/interfaces/IPresenters'
import { IUseCases } from '@/dependencyInjection/interfaces/IUseCases'
import AccountPresenter from '@/admin/adapters/presenters/Account'
import MePresenter from '@/auth/adapters/presenters/Me'
import PermissionPresenter from '@/permission/adapters/presenters/Permission'
import RolePresenter from '@/role/adapters/presenters/Role'
import TokenPresenter from '@/auth/adapters/presenters/Token'

function createPresenters(useCases: IUseCases): IPresenters {
  return {
    auth: {
      token: new TokenPresenter(useCases.auth.token),
      me: new MePresenter(useCases.auth.me)
    },
    admin: {
      account: new AccountPresenter(useCases.admin.account)
    },
    permission: new PermissionPresenter(useCases.permission),
    role: new RolePresenter(useCases.role)
  }
}

export default createPresenters
