import {
  IRoleEntity,
  IRoleData,
  Status,
  IPermission
} from '@/role/domains/entities/interfaces/IRole'

class RoleEntity implements IRoleEntity {
  private readonly _id: number
  private readonly _name: string
  private readonly _description: string
  private readonly _status: Status
  private readonly _createdUser: string
  private readonly _createdAt: string
  private readonly _updatedUser: string
  private readonly _updatedAt: string
  private readonly _permissions: IPermission[]

  constructor(parameters: IRoleData) {
    this._id = parameters.id
    this._name = parameters.name
    this._description = parameters.description
    this._status = parameters.status
    this._createdUser = parameters.createdUser
    this._createdAt = parameters.createdAt
    this._updatedUser = parameters.updatedUser
    this._updatedAt = parameters.updatedAt
    this._permissions = parameters.permissions
  }

  get id(): number {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get description(): string {
    return this._description
  }

  get status(): Status {
    return this._status
  }

  get createdUser(): string {
    return this._createdUser
  }
  get createdAt(): string {
    return this._createdAt
  }
  get updatedUser(): string {
    return this._updatedUser
  }
  get updatedAt(): string {
    return this._updatedAt
  }
  get permissions(): IPermission[] {
    return this._permissions
  }
}

export default RoleEntity
