import { IPermissionEntity, IPermissionData } from '@/permission/domain/interface/iPermissionEntity'

class PermissionEntity implements IPermissionEntity {
  private readonly _id: number
  private readonly _name: string
  private readonly _children: {
    id: number
    name: string
    parentId: number
  }[]

  constructor(parameters: IPermissionData) {
    this._id = parameters.id
    this._name = parameters.name
    this._children = parameters.children || []
  }

  get id(): number {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get children(): {
    id: number
    name: string
    parentId: number
  }[] {
    return this._children
  }
}

export default PermissionEntity
