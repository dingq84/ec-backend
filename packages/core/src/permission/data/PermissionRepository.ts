import { Either } from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'
import { either } from 'fp-ts'

import { IHttpInfrastructure, ResponseResult } from '@/common/adapter/interface/iHttpInfrastructure'
import { ApiUrl } from '@/common/constants/api'
import { IErrorInputPort } from '@/common/application/interface/iErrorUseCase'
import { IPermissionData, IPermissionEntity } from '@/permission/domain/interface/iPermissionEntity'
import PermissionEntity from '@/permission/domain/PermissionEntity'
import { IPermissionRepository } from '@/permission/application/repository-interface/iPermissionRepository'

class PermissionRepository implements IPermissionRepository {
  constructor(private readonly http: IHttpInfrastructure) {}

  async getPermissionList(): Promise<Either<IErrorInputPort, IPermissionEntity[]>> {
    const result = await this.http.request<{ permission: IPermissionData[] }>({
      url: ApiUrl.permissionList,
      method: 'GET',
      withAuth: true,
      data: {}
    })

    return flow(
      either.map((response: ResponseResult<{ permission: IPermissionData[] }>) => {
        return response.data.permission.map(permission => new PermissionEntity(permission))
      })
    )(result)
  }
}

export default PermissionRepository
