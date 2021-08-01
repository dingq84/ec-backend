// interfaces
import { IHttp } from '@ec-backend/core/src/common/adapters/infrastructures/interfaces/IHttp'
import { IStorage } from '@ec-backend/core/src/common/adapters/infrastructures/interfaces/IStorage'

export interface IInfrastructures {
  storage: IStorage
  http: IHttp
}
