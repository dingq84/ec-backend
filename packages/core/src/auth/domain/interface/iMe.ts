import { IRoleData, IRoleEntity } from '@/role/domain/interface/iRoleEntity'

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

export interface IMeData {
  readonly menu: IMenu[]
  readonly user: IUser
  readonly role: Pick<IRoleData, 'id' | 'name'>[]
}

export interface IMeEntity {
  readonly menu: IMenu[]
  readonly user: IUser
  readonly role: Pick<IRoleEntity, 'id' | 'name'>[]
}
