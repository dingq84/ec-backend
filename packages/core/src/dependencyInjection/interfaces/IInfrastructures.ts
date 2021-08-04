// interfaces
import { IHttp } from '@/common/adapters/infrastructures/interfaces/IHttp'
import { IStorage } from '@/common/adapters/infrastructures/interfaces/IStorage'

export interface IInfrastructures {
  storage: IStorage
  http: IHttp
}
