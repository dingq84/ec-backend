import { either } from 'fp-ts'
import { Either } from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'

import { IHttpInfrastructure, ResponseResult } from '@/common/adapter/interface/iHttpInfrastructure'
import { IErrorInputPort } from '@/common/application/interface/iErrorUseCase'
import { IPaginationInputPort } from '@/common/application/interface/iPaginationUseCase'
import { ApiUrl } from '@/common/constants/api'
import {
  IRoleRepository,
  IRoleRepositoryParameters
} from '@/role/application/repository-interface/iRoleRepository'
import { IRoleEntity, IRoleData } from '@/role/domain/interface/iRoleEntity'
import RoleEntity from '@/role/domain/RoleEntity'
import { IAccountData, IAccountEntity } from '@/admin/domain/interface/iAccountEntity'
import AccountEntity from '@/admin/domain/AccountEntity'

class RoleRepository implements IRoleRepository {
  constructor(private readonly http: IHttpInfrastructure) {}

  async getRoleList(
    parameters: IRoleRepositoryParameters['getRoleList']
  ): Promise<Either<IErrorInputPort, { roles: IRoleEntity[]; pagination: IPaginationInputPort }>> {
    const result = await this.http.request<IPaginationInputPort & { data: IRoleData[] }>({
      url: ApiUrl.roleList,
      method: 'GET',
      withAuth: true,
      params: parameters,
      data: {}
    })

    return flow(
      either.map((response: ResponseResult<IPaginationInputPort & { data: IRoleData[] }>) => {
        const { data, ...restData } = response.data
        return {
          roles: data.map(role => new RoleEntity(role)),
          pagination: restData
        }
      })
    )(result)
  }

  async updateRoleStatus(
    parameters: IRoleRepositoryParameters['updateRoleStatus']
  ): Promise<Either<IErrorInputPort, void>> {
    const result = await this.http.request<void>({
      url: ApiUrl.roleStatus,
      method: 'PATCH',
      withAuth: true,
      data: parameters
    })

    return flow(either.map((response: ResponseResult<void>) => response.data))(result)
  }

  async deleteRole(
    parameters: IRoleRepositoryParameters['deleteRole']
  ): Promise<Either<IErrorInputPort, void>> {
    const result = await this.http.request<void>({
      url: ApiUrl.roleStatus,
      method: 'PATCH',
      withAuth: true,
      // status 2 為刪除的狀態，不過 api 資料不會回傳 status 2 的資料，因此未納入 Status enum
      data: { ...parameters, status: 2 }
    })
    return flow(either.map((response: ResponseResult<void>) => response.data))(result)
  }

  async createRole(
    parameters: IRoleRepositoryParameters['createRole']
  ): Promise<Either<IErrorInputPort, void>> {
    const result = await this.http.request<void>({
      url: ApiUrl.createRole,
      method: 'POST',
      withAuth: true,
      data: parameters
    })

    return flow(either.map((response: ResponseResult<void>) => response.data))(result)
  }

  async getRoleDetail(
    parameters: IRoleRepositoryParameters['getRoleDetail']
  ): Promise<Either<IErrorInputPort, IRoleEntity>> {
    const { id } = parameters
    const result = await this.http.request<{ role: IRoleData }>({
      url: `${ApiUrl.roleDetail}/${id}`,
      method: 'GET',
      withAuth: true,
      data: {}
    })

    return flow(
      either.map(
        (response: ResponseResult<{ role: IRoleData }>) => new RoleEntity(response.data.role)
      )
    )(result)
  }

  async updateRole(
    parameters: IRoleRepositoryParameters['updateRole']
  ): Promise<Either<IErrorInputPort, void>> {
    const result = await this.http.request<void>({
      url: ApiUrl.updateRole,
      method: 'PATCH',
      withAuth: true,
      data: parameters
    })

    return flow(either.map((response: ResponseResult<void>) => response.data))(result)
  }

  async getRoleAccountList(
    parameters: IRoleRepositoryParameters['getRoleAccountList']
  ): Promise<Either<IErrorInputPort, { accounts: Array<Pick<IAccountEntity, 'id' | 'name'>> }>> {
    const { id } = parameters
    const result = await this.http.request<{ admin: Array<Pick<IAccountData, 'id' | 'name'>> }>({
      url: `${ApiUrl.roleAccountList}/${id}`,
      method: 'GET',
      withAuth: true,
      data: {}
    })

    return flow(
      either.map(
        (response: ResponseResult<{ admin: Array<Pick<IAccountData, 'id' | 'name'>> }>) => ({
          accounts: response.data.admin.map(account => new AccountEntity(account))
        })
      )
    )(result)
  }
}

export default RoleRepository
