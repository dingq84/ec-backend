import { IMeEntity, IUser, IMenu, IMeData } from '@/auth/domain/interface/iMe'
import { IRoleEntity } from '@/role/domain/interface/iRoleEntity'

class MeEntity implements IMeEntity {
  private readonly _user: IUser
  private readonly _menu: IMenu[]
  private readonly _role: Pick<IRoleEntity, 'id' | 'name'>[]

  constructor(parameters: IMeData) {
    this._user = parameters.user
    this._menu = parameters.menu
    this._role = parameters.role
  }

  get user(): IUser {
    return this._user
  }

  get menu(): IMenu[] {
    return this._menu
  }

  get role(): Pick<IRoleEntity, 'id' | 'name'>[] {
    return this._role
  }
}

export default MeEntity
