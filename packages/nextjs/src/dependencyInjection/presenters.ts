// adapters
import TokenPresenter from '@ec-backend/core/src/adapters/presenters/Token'

// interfaces
import { IPresenters } from '@/dependencyInjection/interfaces/IPresenters'
import { IUseCases } from '@/dependencyInjection/interfaces/IUseCases'

function createPresenters(useCases: IUseCases): IPresenters {
  return {
    token: new TokenPresenter(useCases.token)
  }
}

export default createPresenters
