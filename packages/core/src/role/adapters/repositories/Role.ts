import { either } from 'fp-ts'
import { Either } from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'

import { ApiUrl } from '@/common/constants/api'
import ErrorDTO, { IErrorDTO, IErrorParameters } from '@/common/domains/dto/ErrorDTO'
import { IHttp, ResponseResult } from '@/common/adapters/infrastructures/interfaces/IHttp'
import RoleEntity from '@/role/domains/entities/Role'
import { IRoleData, IRoleEntity, Status } from '@/role/domains/entities/interfaces/IRole'
import { IRoleRepository } from '@/role/domains/useCases/repositories-interfaces/IRole'
import PaginationDTO, {
  IPaginationDTO,
  IPaginationParameters
} from '@/common/domains/dto/PaginationDTO'
import { Order } from '@/common/constants/order'

interface IRoleListReturnType extends IPaginationParameters {
  data: IRoleData[]
}

class RoleRepository implements IRoleRepository {
  constructor(private readonly http: IHttp) {}

  async getRoleList(parameters: {
    status?: Status
    name?: string
    orderField: 'createAt' | 'updateAt'
    orderBy: Order
  }): Promise<Either<IErrorDTO, { roles: IRoleEntity[]; pagination: IPaginationDTO }>> {
    const result = await this.http.request<IRoleListReturnType>({
      url: ApiUrl.roleList,
      method: 'GET',
      withAuth: true,
      params: parameters
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
}

export default RoleRepository
