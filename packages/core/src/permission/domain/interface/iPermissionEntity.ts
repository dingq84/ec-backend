export interface IPermissionData {
  readonly id: number
  readonly name: string
  readonly children?: {
    id: number
    name: string
    parentId: number
  }[]
}

export interface IPermissionEntity {
  readonly id: number
  readonly name: string
  readonly children: {
    id: number
    name: string
    parentId: number
  }[]
}
