export interface ITokenUseCase {
  login(): Promise<string>
  getToken(): Promise<string>
  setToken(token: string): void
  removeToken(): void
  refreshToken(): Promise<string>
}
