import { IErrorInputPort, IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { IGetPermissionListOutputPort } from '@/permission/application/interface/iGetPermissionListUseCase'
import { IPermissionEntity } from '@/permission/domain/interface/iPermissionEntity'
import { Either } from 'fp-ts/lib/Either'

export interface IPermissionPresenter {
  getPermissionList(
    data: Either<IErrorInputPort, IPermissionEntity[]>
  ): Either<IErrorOutputPort, IGetPermissionListOutputPort[]>
}
