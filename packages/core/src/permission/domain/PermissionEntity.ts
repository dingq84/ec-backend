import { IPermissionEntity, IPermissionData } from '@/permission/domain/interface/iPermissionEntity'

class PermissionEntity implements IPermissionEntity {
  private readonly _id: number
  private readonly _name: string

  constructor(parameters: IPermissionData) {
    this._id = parameters.id
    this._name = parameters.name
  }

  get id(): number {
    return this._id
  }

  get name(): string {
    return this._name
  }
}

export default PermissionEntity
