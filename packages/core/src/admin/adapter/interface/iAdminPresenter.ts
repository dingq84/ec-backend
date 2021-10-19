import { Either } from 'fp-ts/lib/Either'

import { IErrorInputPort, IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import { IGetAdminListOutputPort } from '@/admin/application/interface/iGetAdminListUseCase'
import { IAdminEntity } from '@/admin/domain/interface/iAdminEntity'
import { IPaginationData } from '@/common/adapter/interface/iHttpInfrastructure'
import { IGetAdminDetailOutputPort } from '@/admin/application/interface/iGetAdminDetailUseCase'

export interface IAdminPresenter {
  getAdminList(
    data: Either<IErrorInputPort, { accounts: IAdminEntity[]; pagination: IPaginationData }>
  ): Either<IErrorOutputPort, IGetAdminListOutputPort>
  getAdminDetail(
    data: Either<IErrorInputPort, IAdminEntity>
  ): Either<IErrorOutputPort, IGetAdminDetailOutputPort>
}
