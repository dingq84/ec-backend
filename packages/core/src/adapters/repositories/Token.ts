/**
 * @author Ding.Chen 2021-07-29
 * 根據 use cases layer 的 repositories interfaces 實作出 Token 的操作
 */
// dto
import TokenDTO, { ITokenDTO, ITokenParameters } from '@/domains/dto/TokenDTO'

// interfaces
import { IStorage } from '@/adapters/infrastructures/interfaces/IStorage'
import { ITokenRepository } from '@/domains/useCases/repositories-interfaces/IToken'

class TokenRepository implements ITokenRepository {
  constructor(private readonly storage: IStorage) {}

  // TODO: 執行 API 呼叫
  async login(): Promise<ITokenDTO> {
    const fakeData: ITokenParameters = {
      accessToken: 'asdasas',
      refreshToken: 'wqeqw'
    }
    return new TokenDTO(fakeData)
  }

  getToken(): Promise<string> {
    return this.storage.get('token')
  }

  setToken(token: string): void {
    this.storage.set('token', token)
  }

  removeToken(): void {
    this.storage.remove('token')
  }

  // TODO: 執行 API 呼叫
  async refreshToken(): Promise<ITokenDTO> {
    const refreshToken = await this.getToken()
    const fakeData: ITokenParameters = {
      accessToken: 'asdasas',
      refreshToken
    }
    return new TokenDTO(fakeData)
  }
}

export default TokenRepository
