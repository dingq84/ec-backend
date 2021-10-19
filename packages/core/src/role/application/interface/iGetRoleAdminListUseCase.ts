import { Either } from 'fp-ts/lib/Either'

import { IGetAdminOutputPort } from '@/admin/application/interface/iGetAdminListUseCase'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'

export interface IGetRoleAdminListInputPort {
  id: number
}

export interface IGetRoleAdminListOutputPort {
  accounts: Pick<IGetAdminOutputPort, 'id' | 'name'>[]
}

export interface IGetRoleAdminListUseCase {
  getRoleAdminList(
    parameters: IGetRoleAdminListInputPort
  ): Promise<Either<IErrorOutputPort, IGetRoleAdminListOutputPort>>
}
