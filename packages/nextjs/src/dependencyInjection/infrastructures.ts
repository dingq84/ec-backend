// infrastructures
import Storage from '@ec-backend/core/src/common/adapters/infrastructures/Storage'
import Http from '@ec-backend/core/src/common/adapters/infrastructures/Http'

// interfaces
import { IInfrastructures } from '@/dependencyInjection/interfaces/IInfrastructures'

function createInfrastructure(): IInfrastructures {
  return {
    storage: new Storage((globalThis as any).localStorage),
    http: Http.getInstance()
  }
}

export default createInfrastructure
