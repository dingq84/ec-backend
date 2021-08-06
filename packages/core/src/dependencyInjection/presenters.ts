import MePresenter from '@/auth/adapters/presenters/Me'
import TokenPresenter from '@/auth/adapters/presenters/Token'
import { IPresenters } from '@/dependencyInjection/interfaces/IPresenters'
import { IUseCases } from '@/dependencyInjection/interfaces/IUseCases'

function createPresenters(useCases: IUseCases): IPresenters {
  return {
    auth: {
      token: new TokenPresenter(useCases.auth.token),
      me: new MePresenter(useCases.auth.me)
    }
  }
}

export default createPresenters
