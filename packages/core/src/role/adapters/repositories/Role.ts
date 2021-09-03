import { either } from 'fp-ts'
import { Either } from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'

import { ApiUrl } from '@/common/constants/api'
import ErrorDTO, { IErrorDTO, IErrorParameters } from '@/common/domains/dto/ErrorDTO'
import { IHttp, ResponseResult } from '@/common/adapters/infrastructures/interfaces/IHttp'
import { Order } from '@/common/constants/order'
import PaginationDTO, {
  IPaginationDTO,
  IPaginationParameters
} from '@/common/domains/dto/PaginationDTO'
import RoleEntity from '@/role/domains/entities/Role'
import { IRoleData, IRoleEntity, Status } from '@/role/domains/entities/interfaces/IRole'
import { IRoleRepository } from '@/role/domains/useCases/repositories-interfaces/IRole'
import RoleErrorDTO from '@/role/domains/dto/RoleErrorDTO'

interface IRoleListReturnType extends IPaginationParameters {
  data: IRoleData[]
}

class RoleRepository implements IRoleRepository {
  constructor(private readonly http: IHttp) {}

  async getRoleList(parameters: {
    status?: Status
    name?: string
    orderBy: Order
    page: number
  }): Promise<Either<IErrorDTO, { roles: IRoleEntity[]; pagination: IPaginationDTO }>> {
    const result = await this.http.request<IRoleListReturnType>({
      url: ApiUrl.roleList,
      method: 'GET',
      withAuth: true,
      // 畫面不會傳遞其他 orderField，因此不開放給外部
      params: { ...parameters, orderField: 'createAt' }
    })

    return flow(
      (data: Either<IErrorParameters, ResponseResult<IRoleListReturnType>>) =>
        either.mapLeft((error: IErrorParameters) => new ErrorDTO(error))<
          ResponseResult<IRoleListReturnType>
        >(data),
      either.map((response: ResponseResult<IRoleListReturnType>) => {
        const { data, ...restData } = response.data
        return {
          roles: data.map(role => new RoleEntity(role)),
          pagination: new PaginationDTO(restData)
        }
      })
    )(result)
  }

  async updateRoleStatus(parameters: {
    id: number
    status: Status
  }): Promise<Either<IErrorDTO, void>> {
    const result = await this.http.request<void>({
      url: ApiUrl.roleStatus,
      method: 'PATCH',
      withAuth: true,
      data: parameters
    })

    return flow(
      (data: Either<IErrorParameters, ResponseResult<void>>) =>
        either.mapLeft((error: IErrorParameters) => new RoleErrorDTO(error))<ResponseResult<void>>(
          data
        ),
      either.map((response: ResponseResult<void>) => response.data)
    )(result)
  }

  async deleteRole(id: number): Promise<Either<IErrorDTO, void>> {
    const result = await this.http.request<void>({
      url: ApiUrl.roleStatus,
      method: 'PATCH',
      withAuth: true,
      // status 2 為刪除的狀態，不過 api 資料不會回傳 status 2 的資料，因此未納入 Status enum
      data: { id, status: 2 }
    })
    return flow(
      (data: Either<IErrorParameters, ResponseResult<void>>) =>
        either.mapLeft((error: IErrorParameters) => new RoleErrorDTO(error))<ResponseResult<void>>(
          data
        ),
      either.map((response: ResponseResult<void>) => response.data)
    )(result)
  }
}

export default RoleRepository
