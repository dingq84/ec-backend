// 啟用狀態
enum Status {
  inactive = 0,
  active = 1,
  delete = 2
}

interface IMenuItem {
  id: number
  parent_id: number
  children?: IMenuItem[]
}

interface CreateAndUpdate {
  created_user?: number | null
  created_at?: string | null
  updated_user?: string | null
  updated_at?: string | null
}

interface IRoleItem extends CreateAndUpdate {
  id: number
  name: string
  status: Status
}

interface IUser extends CreateAndUpdate {
  id: number
  account: string
  name: string
  phone: string
  status: Status
  roles: IRoleItem[]
}

export interface IMeParameters {
  menu: IMenuItem[]
  user: IUser
}

export interface IMeDTO {
  readonly menu: IMenuItem[]
  readonly user: IUser
}

class MeDTO implements IMeDTO {
  readonly menu: IMenuItem[]
  readonly user: IUser

  constructor(parameters: IMeParameters) {
    this.menu = parameters.menu
    this.user = parameters.user
  }
}

export default MeDTO
