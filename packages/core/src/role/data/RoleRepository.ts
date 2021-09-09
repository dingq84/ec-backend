import { either } from 'fp-ts'
import { Either } from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'

import { IHttpInfrastructure, ResponseResult } from '@/common/adapter/interface/iHttpInfrastructure'
import { IErrorInputPort } from '@/common/application/interface/iErrorUseCase'
import { IPaginationInputPort } from '@/common/application/interface/iPaginationUseCase'
import { ApiUrl } from '@/common/constants/api'
import { IRoleRepository } from '@/role/application/repository-interface/iRoleRepository'
import { IGetRoleListInputPort } from '@/role/application/interface/iGetRoleListUseCase'
import { IUpdateRoleStatusInputPort } from '@/role/application/interface/iUpdateRoleStatusUseCase'
import { IDeleteRoleInputPort } from '@/role/application/interface/iDeleteRoleUseCase'
import { IRoleEntity, IRoleData } from '@/role/domain/interface/iRoleEntity'
import RoleEntity from '@/role/domain/RoleEntity'

class RoleRepository implements IRoleRepository {
  constructor(private readonly http: IHttpInfrastructure) {}

  async getRoleList(
    parameters: IGetRoleListInputPort
  ): Promise<Either<IErrorInputPort, { roles: IRoleEntity[]; pagination: IPaginationInputPort }>> {
    const result = await this.http.request<IPaginationInputPort & { data: IRoleData[] }>({
      url: ApiUrl.roleList,
      method: 'GET',
      withAuth: true,
      // 畫面不會傳遞其他 orderField，因此不開放給外部
      params: { ...parameters, orderField: 'createAt' }
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
    parameters: IUpdateRoleStatusInputPort
  ): Promise<Either<IErrorInputPort, void>> {
    const result = await this.http.request<void>({
      url: ApiUrl.roleStatus,
      method: 'PATCH',
      withAuth: true,
      data: parameters
    })

    return flow(either.map((response: ResponseResult<void>) => response.data))(result)
  }

  async deleteRole(parameters: IDeleteRoleInputPort): Promise<Either<IErrorInputPort, void>> {
    const result = await this.http.request<void>({
      url: ApiUrl.roleStatus,
      method: 'PATCH',
      withAuth: true,
      // status 2 為刪除的狀態，不過 api 資料不會回傳 status 2 的資料，因此未納入 Status enum
      data: { ...parameters, status: 2 }
    })
    return flow(either.map((response: ResponseResult<void>) => response.data))(result)
  }
}

export default RoleRepository
