import { either } from 'fp-ts'
import { Either, isRight, left } from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/function'

import { ITokenUseCase } from '@/auth/domains/useCases/interfaces/IToken'
import { ITokenRepository } from '@/auth/domains/useCases/repositories-interfaces/IToken'
import { DataError, ErrorTypes } from '@/common/types/DataError'
import { ITokenDTO } from '../dto/TokenDTO'

class TokenUseCase implements ITokenUseCase {
  constructor(private readonly tokenRepository: ITokenRepository) {}

  async login(parameters: {
    account: string
    password: string
  }): Promise<Either<DataError, string>> {
    // 基於更好的資安考量將 refreshToken 儲存在 storage，將 accessToken 回傳出去（儲存在記憶體）
    // 當畫面重新整理， accessToken 會遺失，但是 refreshToken 會 keep 在 storage，
    // 透過 refreshToken api 取得新的 accessToken
    // https://stackoverflow.com/questions/64379817/nextjs-auth-token-stored-in-memory-refresh-token-in-http-only-cookie
    const result = await this.tokenRepository.login(parameters)

    if (isRight(result)) {
      const { accessToken, refreshToken } = result.right
      this.tokenRepository.setRefreshToken(accessToken, refreshToken)
    }

    return flow(either.map((response: ITokenDTO) => response.accessToken))(result)
  }

  async logout(): Promise<Either<DataError, void>> {
    const result = await this.tokenRepository.logout()

    if (isRight(result)) {
      this.tokenRepository.removeRefreshToken()
    }

    return result
  }

  async refreshToken(): Promise<Either<DataError, string>> {
    const refreshToken = await this.getRefreshToken()

    if (refreshToken === null) {
      return left({ kind: ErrorTypes.authenticated })
    }

    const result = await this.tokenRepository.refreshToken()

    if (isRight(result)) {
      const { accessToken, refreshToken } = result.right
      this.tokenRepository.setRefreshToken(accessToken, refreshToken)
    }

    return flow(either.map((response: ITokenDTO) => response.accessToken))(result)
  }

  async getRefreshToken(): Promise<string | null> {
    return await this.tokenRepository.getRefreshToken()
  }

  getAccessToken(): string {
    return this.tokenRepository.getAccessToken()
  }
}

export default TokenUseCase
