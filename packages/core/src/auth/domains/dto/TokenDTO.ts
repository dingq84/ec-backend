/**
 * @author Ding.Chen 2021-07-30
 * 這邊主要是將外部資料進行轉換，再注入進系統內
 */

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
