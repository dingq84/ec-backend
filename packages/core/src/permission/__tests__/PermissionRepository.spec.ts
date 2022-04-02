import { isLeft, isRight } from 'fp-ts/lib/Either'

import HttpInfrastructure from '@/common/adapter/HttpInfrastructure'
import { IHttpInfrastructure } from '@/common/adapter/interface/iHttpInfrastructure'
import { StatusCode } from '@/common/constants/statusCode'
import PermissionRepository from '@/permission/data/PermissionRepository'
import { IPermissionRepository } from '@/permission/application/repository-interface/iPermissionRepository'
import PermissionEntity from '@/permission/domain/PermissionEntity'
import dataJson from '@/mocks/data.json'

describe('Name of the group', () => {
  let http: IHttpInfrastructure
  let repository: IPermissionRepository

  beforeAll(() => {
    http = HttpInfrastructure.getInstance()
    repository = new PermissionRepository(http)
  })

  afterAll(() => {
    HttpInfrastructure.resetInstance()
  })

  it(`should get status code ${StatusCode.tokenCancel} without token`, async () => {
    expect.assertions(1)
    const data = await repository.getPermissionList()

    if (isLeft(data)) {
      expect(data.left.statusCode).toBe(StatusCode.tokenCancel)
    }
  })

  it('should get the permission data with token', async () => {
    expect.assertions(2)

    http.token = 'test token'
    const data = await repository.getPermissionList()
    if (isRight(data)) {
      expect(data.right[0]).toBeInstanceOf(PermissionEntity)
      expect(data.right).toHaveLength(dataJson.permissionList.length)
    }
  })
})
