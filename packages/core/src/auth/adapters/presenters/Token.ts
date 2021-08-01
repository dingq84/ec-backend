// interfaces
import { ITokenPresenter } from '@/auth/adapters/presenters/interfaces/Token'
import { ITokenUseCase } from '@/auth/domains/useCases/interfaces/IToken'

class TokenPresenter implements ITokenPresenter {
  constructor(private readonly useCases: ITokenUseCase) {}

  async login(): Promise<string> {
    return await this.useCases.login()
  }

  removeToken(): void {
    this.useCases.removeToken()
  }

  async refreshToken(): Promise<string> {
    return await this.useCases.refreshToken()
  }
}

export default TokenPresenter
