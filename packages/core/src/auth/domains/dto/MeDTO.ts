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
interface IRoleItem {
  id: number
  name: string
}

interface IUser {
  id: number
  account: string
  name: string
  phone: string
  status: Status
}

export interface IMeParameters {
  menu: IMenuItem[]
  user: IUser
  role: IRoleItem[]
}

export interface IMeDTO {
  readonly menu: IMenuItem[]
  readonly user: IUser
  readonly role: IRoleItem[]
}

class MeDTO implements IMeDTO {
  readonly menu: IMenuItem[]
  readonly user: IUser
  readonly role: IRoleItem[]

  constructor(parameters: IMeParameters) {
    this.menu = parameters.menu
    this.user = parameters.user
    this.role = parameters.role
  }
}

export default MeDTO
