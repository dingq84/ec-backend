import infrastructures from '@/dependencyInjection/infrastructures'
import repositories from '@/dependencyInjection/repositories'
import UseCases from '@/dependencyInjection/useCases'
import presenters from '@/dependencyInjection/presenters'
import { IPresenters } from '@/dependencyInjection/interfaces/IPresenters'

const cInfrastructures = infrastructures()
const cRepositories = repositories(cInfrastructures)
const cUseCases = UseCases(cRepositories)
const cPresenters = presenters(cUseCases)

const core: IPresenters = {
  token: cPresenters.token
}

export default core
