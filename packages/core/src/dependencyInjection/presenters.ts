import TokenPresenter from '@/auth/adapters/presenters/Token'
import { IPresenters } from '@/dependencyInjection/interfaces/IPresenters'
import { IUseCases } from '@/dependencyInjection/interfaces/IUseCases'

function createPresenters(useCases: IUseCases): IPresenters {
  return {
    token: new TokenPresenter(useCases.token)
  }
}

export default createPresenters
