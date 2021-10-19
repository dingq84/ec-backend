import { Either } from 'fp-ts/lib/Either'

import { IErrorInputPort, IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { IPaginationInputPort } from '@/common/application/interface/iPaginationUseCase'
import { IGetRoleListOutputPort } from '@/role/application/interface/iGetRoleListUseCase'
import { IRoleEntity } from '@/role/domain/interface/iRoleEntity'
import { IGetRoleDetailOutputPort } from '@/role/application/interface/iGetRoleDetailUseCase'
import { IAdminEntity } from '@/admin/domain/interface/iAdminEntity'
import { IGetRoleAdminListOutputPort } from '@/role/application/interface/iGetRoleAdminListUseCase'

export interface IRolePresenter {
  getRoleList(
    data: Either<IErrorInputPort, { roles: IRoleEntity[]; pagination: IPaginationInputPort }>
  ): Either<IErrorOutputPort, IGetRoleListOutputPort>
  getRoleDetail(
    data: Either<IErrorInputPort, IRoleEntity>
  ): Either<IErrorOutputPort, IGetRoleDetailOutputPort>
  getRoleAdminList(
    data: Either<IErrorInputPort, { accounts: Array<Pick<IAdminEntity, 'id' | 'name'>> }>
  ): Either<IErrorOutputPort, IGetRoleAdminListOutputPort>
}
