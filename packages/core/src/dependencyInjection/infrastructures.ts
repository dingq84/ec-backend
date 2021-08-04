import Storage from '@/common/adapters/infrastructures/Storage'
import Http from '@/common/adapters/infrastructures/Http'
import { IInfrastructures } from '@/dependencyInjection/interfaces/IInfrastructures'

function createInfrastructure(): IInfrastructures {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    storage: new Storage((globalThis as any)?.localStorage),
    http: Http.getInstance()
  }
}

export default createInfrastructure
