// domain
import TokenUseCases from '@ec-backend/core/src/domains/useCases/Token'

// interfaces
import { IUseCases } from '@/dependencyInjection/interfaces/IUseCases'
import { IRepositories } from '@/dependencyInjection/interfaces/IRepositories'

function createUseCases(repositories: IRepositories): IUseCases {
  return {
    token: new TokenUseCases(repositories.token)
  }
}

export default createUseCases
