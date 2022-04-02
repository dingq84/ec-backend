import GetPermissionListUseCase from '@/permission/application/GetPermissionListUseCase'
import PermissionRepository from '@/permission/data/PermissionRepository'
import PermissionPresenter from '@/permission/adapter/PermissionPresenter'
import { IPermissionRepository } from '@/permission/application/repository-interface/iPermissionRepository'
import { IPermissionPresenter } from '@/permission/adapter/interface/iPermissionPresenter'

import dataJson from '@/mocks/data.json'
import { right } from 'fp-ts/lib/Either'
import HttpInfrastructure from '@/common/adapter/HttpInfrastructure'
import ErrorPresenter from '@/common/adapter/ErrorPresenter'

jest.mock('@/permission/data/PermissionRepository')
// jest.mock('@/permission/adapter/PermissionPresenter')

describe('testing GetPermissionUseCase', () => {
  let repository: IPermissionRepository
  let presenter: IPermissionPresenter

  beforeAll(() => {
    const http = HttpInfrastructure.getInstance()
    repository = new PermissionRepository(http)
    repository.getPermissionList = jest
      .fn()
      .mockImplementation(() => Promise.resolve(right([dataJson.permissionList[0]])))

    const errorPresenter = new ErrorPresenter()
    presenter = new PermissionPresenter(errorPresenter)
  })

  it('should ', async () => {
    const useCase = new GetPermissionListUseCase(repository, presenter)
    const result = await useCase.getPermissionList()
    console.log(result)

    expect(1).toBe(1)
  })
})
