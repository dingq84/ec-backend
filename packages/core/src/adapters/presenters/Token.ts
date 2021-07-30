// interfaces
import { ITokenPresenter } from '@/adapters/presenters/interfaces/Token'
import { ITokenUseCase } from '@/domains/useCases/interfaces/IToken'

class TokenPresenter implements ITokenPresenter {
  constructor(private readonly useCases: ITokenUseCase) {}

  async login(): Promise<string> {
    return await this.useCases.login()
  }

  getToken(): Promise<string> {
    return this.useCases.getToken()
  }

  setToken(token: string): void {
    this.useCases.setToken(token)
  }

  removeToken(): void {
    this.useCases.removeToken()
  }

  async refreshToken(): Promise<string> {
    return await this.useCases.refreshToken()
  }
}

export default TokenPresenter
