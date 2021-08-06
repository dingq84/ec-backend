import { Either } from 'fp-ts/lib/Either'

import { DataError } from '@/common/types/DataError'
import { ITokenPresenter } from '@/auth/adapters/presenters/interfaces/IToken'
import { ITokenUseCase } from '@/auth/domains/useCases/interfaces/IToken'

class TokenPresenter implements ITokenPresenter {
  constructor(private readonly useCases: ITokenUseCase) {}

  async login(parameters: {
    account: string
    password: string
  }): Promise<Either<DataError, string>> {
    return await this.useCases.login(parameters)
  }

  async logout(): Promise<Either<DataError, void>> {
    return await this.useCases.logout()
  }

  async refreshToken(): Promise<Either<DataError, string>> {
    return await this.useCases.refreshToken()
  }

  async getRefreshToken(): Promise<string | null> {
    return await this.useCases.getRefreshToken()
  }

  getAccessToken(): string {
    return this.useCases.getAccessToken()
  }
}

export default TokenPresenter
