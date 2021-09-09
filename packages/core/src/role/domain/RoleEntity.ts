import { IRoleEntity, IRoleData, Status } from '@/role/domain/interface/iRoleEntity'
import { IPermissionEntity } from '@/permission/domain/interface/iPermissionEntity'
import Validator from '@/common/domain/Validator'
import { StatusCode } from '@/common/constants/statusCode'
import { IErrorInputPort } from '@/common/application/interface/iErrorUseCase'

class RoleEntity implements IRoleEntity {
  private readonly _id: number
  private readonly _name: string
  private readonly _status: Status
  private readonly _createdUser: string
  private readonly _createdAt: string
  private readonly _updatedUser: string
  private readonly _updatedAt: string
  private readonly _permissions: IPermissionEntity[]

  constructor(parameters: IRoleData) {
    this._id = parameters.id
    this._name = parameters.name
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

  get permissions(): IPermissionEntity[] {
    return this._permissions
  }

  static updateRoleStatusValidate(
    parameters: Pick<IRoleEntity, 'id' | 'status'>
  ): IErrorInputPort | true {
    const { id, status } = parameters
    if (!Validator.isNumber(id)) {
      const statusMessage = '角色 id 格式需為數字'
      return {
        statusCode: StatusCode.wrongRoleId,
        statusMessage,
        data: {
          id: statusMessage
        }
      }
    }

    if (![Status.active, Status.inactive, Status.delete].includes(status)) {
      const statusMessage = `角色狀態需為 ${Status.inactive}、${Status.active} 或 ${Status.delete}其一`
      return {
        statusCode: StatusCode.wrongRoleStatus,
        statusMessage,
        data: {
          id: statusMessage
        }
      }
    }

    return true
  }

  static deleteRoleValidate(parameters: Pick<IRoleEntity, 'id'>): IErrorInputPort | true {
    const { id } = parameters
    if (!Validator.isNumber(id)) {
      const statusMessage = '角色 id 格式需為數字'
      return {
        statusCode: StatusCode.wrongRoleId,
        statusMessage,
        data: {
          id: statusMessage
        }
      }
    }
    return true
  }
}

export default RoleEntity
