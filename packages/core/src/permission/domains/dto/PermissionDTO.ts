export interface IPermissionParameters {
  id: number
  name: string
}

export interface IPermissionDTO {
  id: number
  name: string
}

class PermissionDTO implements IPermissionDTO {
  readonly id: number
  readonly name: string

  constructor(parameters: IPermissionParameters) {
    this.id = parameters.id
    this.name = parameters.name
  }
}

export default PermissionDTO
