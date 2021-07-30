// infrastructures
import Storage from '@ec-backend/core/src/adapters/infrastructures/Storage'

// interfaces
import { IInfrastructures } from '@/dependencyInjection/interfaces/IInfrastructures'

function createInfrastructure(): IInfrastructures {
  return {
    storage: new Storage((globalThis as any).localStorage)
  }
}

export default createInfrastructure
