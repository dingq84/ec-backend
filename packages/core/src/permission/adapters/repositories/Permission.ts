import { Either } from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'
import { either } from 'fp-ts'

import { IHttp, ResponseResult } from '@/common/adapters/infrastructures/interfaces/IHttp'
import { ApiUrl } from '@/common/constants/api'
import ErrorDTO, { IErrorDTO, IErrorParameters } from '@/common/domains/dto/ErrorDTO'
import {
  IPermissionData,
  IPermissionEntity
} from '@/permission/domains/entities/interfaces/IPermission'
import PermissionEntity from '@/permission/domains/entities/Permission'
import { IPermissionRepository } from '@/permission/domains/useCases/repositories-interfaces/IPermission'

class PermissionRepository implements IPermissionRepository {
  constructor(private readonly http: IHttp) {}

  async getPermissions(): Promise<Either<IErrorDTO, IPermissionEntity[]>> {
    const result = await this.http.request<IPermissionData[]>({
      url: ApiUrl.permissionList,
      method: 'GET',
      withAuth: true
    })

    return flow(
      (data: Either<IErrorParameters, ResponseResult<IPermissionData[]>>) =>
        either.mapLeft((error: IErrorParameters) => new ErrorDTO(error))<
          ResponseResult<IPermissionData[]>
        >(data),
      either.map((response: ResponseResult<IPermissionData[]>) => {
        return response.data.map(role => new PermissionEntity(role))
      })
    )(result)
  }
}

export default PermissionRepository
