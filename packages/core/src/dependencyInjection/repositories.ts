import TokenRepository from '@/auth/adapters/repositories/Token'
import { IInfrastructures } from '@/dependencyInjection/interfaces/IInfrastructures'
import { IRepositories } from '@/dependencyInjection/interfaces/IRepositories'

function createRepositories(infrastructures: IInfrastructures): IRepositories {
  return {
    token: new TokenRepository(infrastructures.storage, infrastructures.http)
  }
}

export default createRepositories
