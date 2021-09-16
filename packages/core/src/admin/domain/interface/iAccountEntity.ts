import { Status } from '@/common/constants/status'
import { IRoleData, IRoleEntity } from '@/role/domain/interface/iRoleEntity'

export interface IAccountData {
  id: number
  name: string
  account: string
  status: Status
  createdAt: string
  updatedAt: string
  roles: Array<Pick<IRoleData, 'id' | 'name'>>
}

export interface IAccountEntity {
  readonly id: number
  readonly name: string
  readonly account: string
  readonly status: Status
  readonly createdAt: string
  readonly updatedAt: string
  roles: Array<Pick<IRoleEntity, 'id' | 'name'>>
}
