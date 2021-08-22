export interface ITokenParameters {
  accessToken: string
  refreshToken: string
}

export interface ITokenDTO {
  readonly accessToken: string
  readonly refreshToken: string
}

class TokenDTO implements ITokenDTO {
  readonly accessToken: string
  readonly refreshToken: string

  constructor(parameters: ITokenParameters) {
    this.accessToken = parameters.accessToken
    this.refreshToken = parameters.refreshToken
  }
}

export default TokenDTO
