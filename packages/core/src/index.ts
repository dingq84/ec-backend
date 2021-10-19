import { IControllers } from '@/dependencyInjection/interface/iController'
import controllers from '@/dependencyInjection/controllers'
import infrastructures from '@/dependencyInjection/infrastructures'
import repositories from '@/dependencyInjection/repositories'
import useCases from '@/dependencyInjection/useCases'
import presenters from '@/dependencyInjection/presenters'

const cInfrastructures = infrastructures()
const cRepositories = repositories(cInfrastructures)
const cPresenters = presenters()
const cUseCases = useCases(cRepositories, cPresenters)
const cController = controllers(cUseCases)

const core: IControllers = {
  admin: cController.admin,
  auth: cController.auth,
  role: cController.role,
  permission: cController.permission
}

export default core
