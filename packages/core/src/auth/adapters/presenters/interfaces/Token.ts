export interface ITokenPresenter {
  login(): Promise<string>
  removeToken(): void
  refreshToken(): Promise<string>
}
