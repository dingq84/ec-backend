export interface IPermission {
  id: number
  name: string
}

export enum Status {
  inactive = 0,
  active = 1
}

export interface IRoleData {
  readonly id: number
  readonly name: string
  readonly description: string
  readonly status: Status
  readonly createdUser: string
  readonly createdAt: string
  readonly updatedUser: string
  readonly updatedAt: string
  readonly permissions: IPermission[]
}

export interface IRoleEntity {
  readonly id: number
  readonly name: string
  readonly description: string
  readonly status: Status
  readonly createdUser: string
  readonly createdAt: string
  readonly updatedUser: string
  readonly updatedAt: string
  readonly permissions: IPermission[]
}
