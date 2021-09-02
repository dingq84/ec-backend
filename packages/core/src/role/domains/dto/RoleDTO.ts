interface IPermission {
  id: number
  name: string
}

export enum Status {
  both = -1,
  inactive = 0,
  active = 1
}

export interface IRoleParameters {
  readonly id: number
  readonly name: string
  readonly status: Status
  readonly description: string
  readonly createdUser: string
  readonly createdAt: string
  readonly updatedUser: string
  readonly updatedAt: string
  readonly permissions: IPermission[]
}

export interface IRoleDTO {
  readonly id: number
  readonly name: string
  readonly status: Status
  readonly statusText: string
  readonly description: string
  readonly createdUser: string
  readonly createdAt: string
  readonly updatedUser: string
  readonly updatedAt: string
  readonly permissions: IPermission[]
}

class RoleDTO implements IRoleDTO {
  readonly id: number
  readonly name: string
  readonly status: Status
  readonly description: string
  readonly createdUser: string
  readonly createdAt: string
  readonly updatedUser: string
  readonly updatedAt: string
  readonly permissions: IPermission[]

  constructor(parameters: IRoleParameters) {
    this.id = parameters.id
    this.name = parameters.name
    this.description = parameters.description
    this.status = parameters.status
    this.createdUser = parameters.createdUser
    this.createdAt = this.getDateString(parameters.createdAt)
    this.updatedUser = parameters.updatedUser
    this.updatedAt = this.getDateString(parameters.updatedAt)
    this.permissions = parameters.permissions
  }

  get statusText(): string {
    switch (this.status) {
      case 0:
        return '停用'
      case 1:
        return '啟用'
      default:
        return '停用'
    }
  }

  private getDateString(dataTime: string): string {
    return dataTime.split(' ')[0]
  }
}

export default RoleDTO
