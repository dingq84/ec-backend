import AccountPresenter from '@/admin/adapters/presenters/Account'
import MePresenter from '@/auth/adapters/presenters/Me'
import TokenPresenter from '@/auth/adapters/presenters/Token'
import { IPresenters } from '@/dependencyInjection/interfaces/IPresenters'
import { IUseCases } from '@/dependencyInjection/interfaces/IUseCases'
import RolePresenter from '@/role/adapters/presenters/Role'

function createPresenters(useCases: IUseCases): IPresenters {
  return {
    auth: {
      token: new TokenPresenter(useCases.auth.token),
      me: new MePresenter(useCases.auth.me)
    },
    admin: {
      account: new AccountPresenter(useCases.admin.account)
    },
    role: new RolePresenter(useCases.role)
  }
}

export default createPresenters
