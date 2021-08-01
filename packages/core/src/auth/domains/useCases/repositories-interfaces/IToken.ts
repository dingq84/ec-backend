// interfaces
import { ITokenDTO } from '@/auth/domains/dto/TokenDTO'

export interface ITokenRepository {
  login(): Promise<ITokenDTO>
  getToken(): Promise<string>
  setToken(accessToken: string, refreshToken: string): void
  removeToken(): void
  refreshToken(): Promise<ITokenDTO>
}
