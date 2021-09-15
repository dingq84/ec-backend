import { Either } from 'fp-ts/lib/Either'

import { IAccountOutputPort } from '@/admin/application/interface/iGetAccountListUseCase'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'

export interface IGetRoleAccountListInputPort {
  id: number
}

export interface IGetRoleAccountListOutputPort {
  accounts: Pick<IAccountOutputPort, 'id' | 'name'>[]
}

export interface IGetRoleAccountListUseCase {
  getRoleAccountList(
    parameters: IGetRoleAccountListInputPort
  ): Promise<Either<IErrorOutputPort, IGetRoleAccountListOutputPort>>
}
