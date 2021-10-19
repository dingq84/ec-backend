import { IAuthRepository } from '@/auth/application/repository-interface/iAuthRepository'
import { IGetAccessTokenUseCase } from '@/auth/application/interface/iGetAccessTokenUseCase'

class GetAccessTokenUseCase implements IGetAccessTokenUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  getAccessToken(): string {
    return this.authRepository.getAccessToken()
  }
}

export default GetAccessTokenUseCase
