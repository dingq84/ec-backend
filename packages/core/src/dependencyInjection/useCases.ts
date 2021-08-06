import MeUseCase from '@/auth/domains/useCases/Me'
import TokenUseCases from '@/auth/domains/useCases/Token'
import { IUseCases } from '@/dependencyInjection/interfaces/IUseCases'
import { IRepositories } from '@/dependencyInjection/interfaces/IRepositories'

function createUseCases(repositories: IRepositories): IUseCases {
  return {
    auth: {
      token: new TokenUseCases(repositories.auth.token),
      me: new MeUseCase(repositories.auth.me)
    }
  }
}

export default createUseCases
