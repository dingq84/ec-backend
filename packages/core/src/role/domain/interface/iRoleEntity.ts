import { Status } from '@/common/constants/status'
import { IPermissionData, IPermissionEntity } from '@/permission/domain/interface/iPermissionEntity'

export interface IRoleData {
  readonly id: number
  readonly name: string
  readonly status: Status
  readonly createdUser: string
  readonly createdAt: string
  readonly updatedUser: string
  readonly updatedAt: string
  readonly permissions: Pick<IPermissionData, 'id' | 'name'>[]
}

export interface IRoleEntity {
  readonly id: number
  readonly name: string
  readonly status: Status
  readonly createdUser: string
  readonly createdAt: string
  readonly updatedUser: string
  readonly updatedAt: string
  readonly permissions: Pick<IPermissionEntity, 'id' | 'name'>[]
}
