// interfaces
import { ITokenDTO } from '@/domains/dto/TokenDTO'

export interface ITokenRepository {
  login(): Promise<ITokenDTO>
  getToken(): Promise<string>
  setToken(token: string): void
  removeToken(): void
  refreshToken(): Promise<ITokenDTO>
}
