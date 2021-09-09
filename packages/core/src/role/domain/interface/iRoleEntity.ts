import { IPermissionData, IPermissionEntity } from '@/permission/domain/interface/iPermissionEntity'

export enum Status {
  inactive = 0,
  active = 1,
  delete = 2
}

export interface IRoleData {
  readonly id: number
  readonly name: string
  readonly status: Status
  readonly createdUser: string
  readonly createdAt: string
  readonly updatedUser: string
  readonly updatedAt: string
  readonly permissions: IPermissionData[]
}

export interface IRoleEntity {
  readonly id: number
  readonly name: string
  readonly status: Status
  readonly createdUser: string
  readonly createdAt: string
  readonly updatedUser: string
  readonly updatedAt: string
  readonly permissions: IPermissionEntity[]
}
