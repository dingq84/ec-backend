import HttpInfrastructure from '@/common/adapter/HttpInfrastructure'
import StorageInfrastructure from '@/common/adapter/StorageInfrastructure'
import { IInfrastructures } from '@/dependencyInjection/interface/iInfrastructures'

function createInfrastructures(): IInfrastructures {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    storage: new StorageInfrastructure((globalThis as any)?.localStorage),
    http: HttpInfrastructure.getInstance()
  }
}

export default createInfrastructures
