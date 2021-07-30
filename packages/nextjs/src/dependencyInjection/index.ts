// dependencyInjection
import infrastructures from '@/dependencyInjection/infrastructures'
import repositories from '@/dependencyInjection/repositories'
import useCases from '@/dependencyInjection/useCases'
import presenters from '@/dependencyInjection/presenters'

// interfaces
import { IPresenters } from '@/dependencyInjection/interfaces/IPresenters'

const cInfrastructures = infrastructures()
const cRepositories = repositories(cInfrastructures)
// eslint-disable-next-line react-hooks/rules-of-hooks
const cUseCases = useCases(cRepositories)
const cPresenters = presenters(cUseCases)

const core: IPresenters = {
  token: cPresenters.token
}

export default core
