import { Either } from 'fp-ts/lib/Either'

import { IErrorInputPort, IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { IPaginationInputPort } from '@/common/application/interface/iPaginationUseCase'
import { IGetRoleListOutputPort } from '@/role/application/interface/iGetRoleListUseCase'
import { IRoleEntity } from '@/role/domain/interface/iRoleEntity'

export interface IRolePresenter {
  getRoleList(
    data: Either<IErrorInputPort, { roles: IRoleEntity[]; pagination: IPaginationInputPort }>
  ): Either<IErrorOutputPort, IGetRoleListOutputPort>
}
