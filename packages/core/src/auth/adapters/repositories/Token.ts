/**
 * @author Ding.Chen 2021-07-29
 * 根據 use cases layer 的 repositories interfaces 實作出 Token 的操作
 */

// dto
import TokenDTO, { ITokenDTO, ITokenParameters } from '@/auth/domains/dto/TokenDTO'

// interfaces
import { IHttp } from '@/common/adapters/infrastructures/interfaces/IHttp'
import { IStorage } from '@/common/adapters/infrastructures/interfaces/IStorage'
import { ITokenRepository } from '@/auth/domains/useCases/repositories-interfaces/IToken'

class TokenRepository implements ITokenRepository {
  constructor(private readonly storage: IStorage, private readonly http: IHttp) {}

  async login(): Promise<ITokenDTO> {
    const data = await this.http.request<ITokenParameters>({
      method: 'POST',
      url: '/auth/login',
      data: {
        account: 'admin',
        password: 'admin'
      }
    })

    return new TokenDTO(data)
  }

  getToken(): Promise<string> {
    return this.storage.get('token')
  }

  setToken(accessToken: string, refreshToken: string): void {
    this.storage.set('token', refreshToken)
    this.http.storeToken(accessToken)
  }

  removeToken(): void {
    this.storage.remove('token')
  }

  async refreshToken(): Promise<ITokenDTO> {
    const refreshToken = await this.getToken()
    const data = await this.http.request<ITokenParameters>({
      method: 'POST',
      url: '/auth/refreshToken',
      data: {
        refreshToken
      }
    })
    return new TokenDTO(data)
  }
}

export default TokenRepository
