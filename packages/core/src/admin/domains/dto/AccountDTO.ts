export interface IAccountParameters {
  oldPassword: string
  newPassword1: string
  newPassword2: string
  accountId: number
}

export interface IAccountDTO {
  readonly passwordOld: string
  readonly passwordNew: string
  readonly id: number
}

class AccountDTO implements IAccountDTO {
  readonly passwordOld: string
  readonly passwordNew: string
  readonly id: number

  constructor(parameters: IAccountParameters) {
    this.passwordOld = parameters.oldPassword
    this.passwordNew = parameters.newPassword1
    this.id = parameters.accountId
  }
}

export default AccountDTO
