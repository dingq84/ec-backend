import { IRemoveRefreshTokenUseCase } from '@/auth/application/interface/iRemoveRefreshTokenUseCase'
import { IAuthRepository } from '@/auth/application/repository-interface/iAuthRepository'

class RemoveRefreshTokenUseCase implements IRemoveRefreshTokenUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  removeRefreshToken(): void {
    this.authRepository.removeRefreshToken()
  }
}

export default RemoveRefreshTokenUseCase
