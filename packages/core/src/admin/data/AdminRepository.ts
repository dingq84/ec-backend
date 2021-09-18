import { flow } from 'fp-ts/lib/function'
import { Either } from 'fp-ts/lib/Either'
import { either } from 'fp-ts'

import { IHttpInfrastructure, ResponseResult } from '@/common/adapter/interface/iHttpInfrastructure'
import {
  IAdminRepository,
  IAdminRepositoryParameters
} from '@/admin/application/repository-interface/iAdminRepository'
import AdminEntity from '@/admin/domain/AdminEntity'
import { IAdminData, IAdminEntity } from '@/admin/domain/interface/iAdminEntity'
import { IErrorInputPort } from '@/common/application/interface/iErrorUseCase'
import { ApiUrl } from '@/common/constants/api'
import { IPaginationInputPort } from '@/common/application/interface/iPaginationUseCase'

class AdminRepository implements IAdminRepository {
  constructor(private readonly http: IHttpInfrastructure) {}

  async updatePassword(
    parameters: IAdminRepositoryParameters['updatePassword']
  ): Promise<Either<IErrorInputPort, void>> {
    const result = await this.http.request<void>({
      url: ApiUrl.updatePassword,
      method: 'PATCH',
      data: parameters,
      withAuth: true
    })

    return flow(either.map((response: ResponseResult<void>) => response.data))(result)
  }

  async getAdminList(
    parameters: IAdminRepositoryParameters['getAdminList']
  ): Promise<
    Either<IErrorInputPort, { accounts: IAdminEntity[]; pagination: IPaginationInputPort }>
  > {
    const result = await this.http.request<IPaginationInputPort & { data: IAdminData[] }>({
      url: ApiUrl.adminList,
      method: 'GET',
      params: parameters,
      withAuth: true,
      data: {}
    })

    return flow(
      either.map((response: ResponseResult<IPaginationInputPort & { data: IAdminData[] }>) => {
        const { data, ...restData } = response.data
        return {
          accounts: data.map(role => new AdminEntity(role)),
          pagination: restData
        }
      })
    )(result)
  }

  async createAdmin(
    parameters: IAdminRepositoryParameters['createAdmin']
  ): Promise<Either<IErrorInputPort, void>> {
    const result = await this.http.request<void>({
      url: ApiUrl.createAdmin,
      method: 'POST',
      withAuth: true,
      data: parameters
    })

    return flow(either.map((response: ResponseResult<void>) => response.data))(result)
  }

  async updateAdminStatus(
    parameters: IAdminRepositoryParameters['updateAdminStatus']
  ): Promise<Either<IErrorInputPort, void>> {
    const result = await this.http.request<void>({
      url: ApiUrl.adminStatus,
      method: 'PATCH',
      withAuth: true,
      data: parameters
    })

    return flow(either.map((response: ResponseResult<void>) => response.data))(result)
  }

  async deleteAdmin(
    parameters: IAdminRepositoryParameters['deleteAdmin']
  ): Promise<Either<IErrorInputPort, void>> {
    const result = await this.http.request<void>({
      url: ApiUrl.adminStatus,
      method: 'PATCH',
      withAuth: true,
      data: { ...parameters, status: 2 }
    })

    return flow(either.map((response: ResponseResult<void>) => response.data))(result)
  }

  async getAdminDetail(
    parameters: IAdminRepositoryParameters['getAdminDetail']
  ): Promise<Either<IErrorInputPort, IAdminData>> {
    const result = await this.http.request<IAdminData>({
      url: ApiUrl.adminDetail,
      method: 'GET',
      withAuth: true,
      params: parameters,
      data: {}
    })

    return flow(
      either.map((response: ResponseResult<IAdminData>) => new AdminEntity(response.data))
    )(result)
  }

  async updateAdmin(
    parameters: IAdminRepositoryParameters['updateAdmin']
  ): Promise<Either<IErrorInputPort, void>> {
    const result = await this.http.request<void>({
      url: ApiUrl.updateAdmin,
      method: 'PATCH',
      withAuth: true,
      data: parameters
    })

    return flow(either.map((response: ResponseResult<void>) => response.data))(result)
  }
}
export default AdminRepository
