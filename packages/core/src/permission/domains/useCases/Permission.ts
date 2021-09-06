import { IErrorDTO } from '@/common/domains/dto/ErrorDTO'
import { IPermissionUseCase } from '@/permission/domains/useCases/interfaces/IPermission'
import { IPermissionRepository } from '@/permission/domains/useCases/repositories-interfaces/IPermission'
import { Either } from 'fp-ts/lib/Either'
import { IPermissionDTO } from '../dto/PermissionDTO'

class PermissionUseCase implements IPermissionUseCase {
  constructor(private readonly permissionRepository: IPermissionRepository) {}

  getPermissions(): Promise<Either<IErrorDTO, IPermissionDTO[]>> {
    return this.permissionRepository.getPermissions()
  }
}

export default PermissionUseCase
