export interface IAccountParameters {
  oldPassword: string
  newPassword1: string
  newPassword2: string
}

export interface IAccountDTO {
  readonly passwordOld: string
  readonly passwordNew: string
}

class AccountDTO implements IAccountDTO {
  readonly passwordOld: string
  readonly passwordNew: string

  constructor(parameters: IAccountParameters) {
    this.passwordOld = parameters.oldPassword
    this.passwordNew = parameters.newPassword1
  }
}

export default AccountDTO
