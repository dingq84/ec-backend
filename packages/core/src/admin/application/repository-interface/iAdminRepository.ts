import { Either } from 'fp-ts/lib/Either'

import { IErrorInputPort } from '@/common/application/interface/iErrorUseCase'
import { Status } from '@/common/constants/status'
import { Order } from '@/common/constants/order'
import { IAdminEntity } from '@/admin/domain/interface/iAdminEntity'
import { IPaginationInputPort } from '@/common/application/interface/iPaginationUseCase'

export interface IAdminRepositoryParameters {
  updatePassword: {
    id: number
    passwordOld: string
    passwordNew: string
  }
  getAdminList: {
    status?: Status
    roleId?: number
    keyword?: string
    orderBy: Order
    page: number
    orderField: 'created_at' | 'updated_at'
  }
  createAdmin: {
    name: string
    account: string
    password: string
    status: Status
    roleId: number
  }
  updateAdminStatus: {
    id: number
    status: Status
  }
  deleteAdmin: {
    id: number
  }
  getAdminDetail: {
    id: number
  }
  updateAdmin: {
    id: number
    name: string
    account: string
    status: Status
    roleId: number
  }
}

export interface IAdminRepository {
  updatePassword(
    parameters: IAdminRepositoryParameters['updatePassword']
  ): Promise<Either<IErrorInputPort, void>>
  getAdminList(
    parameters: IAdminRepositoryParameters['getAdminList']
  ): Promise<
    Either<IErrorInputPort, { accounts: IAdminEntity[]; pagination: IPaginationInputPort }>
  >
  createAdmin(
    parameters: IAdminRepositoryParameters['createAdmin']
  ): Promise<Either<IErrorInputPort, void>>
  updateAdminStatus(
    parameters: IAdminRepositoryParameters['updateAdminStatus']
  ): Promise<Either<IErrorInputPort, void>>
  deleteAdmin(
    parameters: IAdminRepositoryParameters['deleteAdmin']
  ): Promise<Either<IErrorInputPort, void>>
  getAdminDetail(
    parameters: IAdminRepositoryParameters['getAdminDetail']
  ): Promise<Either<IErrorInputPort, IAdminEntity>>
  updateAdmin(
    parameters: IAdminRepositoryParameters['updateAdmin']
  ): Promise<Either<IErrorInputPort, void>>
}
