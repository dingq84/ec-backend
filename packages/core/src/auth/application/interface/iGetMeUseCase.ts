import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { IRoleEntity } from '@/role/domain/interface/iRoleEntity'

export interface IMenu {
  id: number
  parent_id: number
  children?: IMenu[]
}

export interface IUser {
  id: number
  account: string
  name: string
}

export interface IGetMeOutPort {
  readonly menu: IMenu[]
  readonly user: IUser
  readonly role: Pick<IRoleEntity, 'id' | 'name'>[]
}

export interface IGetMeUseCase {
  getMe(): Promise<Either<IErrorOutputPort, IGetMeOutPort>>
}
