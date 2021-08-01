// interfaces
import { ITokenUseCase } from '@/auth/domains/useCases/interfaces/IToken'
import { ITokenRepository } from '@/auth/domains/useCases/repositories-interfaces/IToken'

class TokenUseCase implements ITokenUseCase {
  constructor(private readonly tokenRepository: ITokenRepository) {}

  async login(): Promise<string> {
    // 基於更好的資安考量將 refreshToken 儲存在 storage，將 accessToken 回傳出去（儲存在記憶體）
    // 當畫面重新整理， accessToken 會遺失，但是 refreshToken 會 keep 在 storage，
    // 透過 refreshToken api 取得新的 accessToken
    // https://stackoverflow.com/questions/64379817/nextjs-auth-token-stored-in-memory-refresh-token-in-http-only-cookie
    const { accessToken, refreshToken } = await this.tokenRepository.login()
    this.setToken(accessToken, refreshToken)
    return accessToken
  }

  setToken(accessToken: string, refreshToken: string): void {
    this.tokenRepository.setToken(accessToken, refreshToken)
  }

  getToken(): Promise<string> {
    return this.tokenRepository.getToken()
  }

  removeToken(): void {
    this.tokenRepository.removeToken()
  }

  async refreshToken(): Promise<string> {
    const { accessToken, refreshToken } = await this.tokenRepository.refreshToken()
    this.setToken(accessToken, refreshToken)
    return accessToken
  }
}

export default TokenUseCase
