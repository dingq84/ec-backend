import { IHttpInfrastructure } from '@/common/adapter/interface/iHttpInfrastructure'
import { IStorageInfrastructure } from '@/common/adapter/interface/iStorageInfrastructure'

export interface IInfrastructures {
  http: IHttpInfrastructure
  storage: IStorageInfrastructure
}
