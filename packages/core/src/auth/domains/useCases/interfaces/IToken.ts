export interface ITokenUseCase {
  login(): Promise<string>
  getToken(): Promise<string>
  setToken(accessToken: string, refreshToken: string): void
  removeToken(): void
  refreshToken(): Promise<string>
}
