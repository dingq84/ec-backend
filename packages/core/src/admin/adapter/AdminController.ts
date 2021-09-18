import { Either } from 'fp-ts/lib/Either'

import {
  IUpdatePasswordInputPort,
  IUpdatePasswordUseCase
} from '@/admin/application/interface/iUpdatePasswordUseCase'
import { IAdminController } from '@/admin/adapter/interface/iAdminController'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import {
  IGetAdminListInputPort,
  IGetAdminListOutputPort,
  IGetAdminListUseCase
} from '@/admin/application/interface/iGetAdminListUseCase'
import {
  ICreateAdminInputPort,
  ICreateAdminUseCase
} from '@/admin/application/interface/iCreateAdminUseCase'
import {
  IUpdateAdminInputPort,
  IUpdateAdminUseCase
} from '@/admin/application/interface/iUpdateAdminUseCase'
import {
  IUpdateAdminStatusInputPort,
  IUpdateAdminStatusUseCase
} from '@/admin/application/interface/iUpdateAdminStatusUseCase'
import {
  IDeleteAdminInputPort,
  IDeleteAdminUseCase
} from '@/admin/application/interface/iDeleteAdminUseCase'
import {
  IGetAdminDetailInputPort,
  IGetAdminDetailOutputPort,
  IGetAdminDetailUseCase
} from '@/admin/application/interface/iGetAdminDetailUseCase'

class AdminController implements IAdminController {
  constructor(
    private readonly updatePasswordUseCase: IUpdatePasswordUseCase,
    private readonly getAdminListUseCase: IGetAdminListUseCase,
    private readonly createAdminUseCase: ICreateAdminUseCase,
    private readonly updateAdminUseCase: IUpdateAdminUseCase,
    private readonly updateAdminStatusUseCase: IUpdateAdminStatusUseCase,
    private readonly deleteAdminUseCase: IDeleteAdminUseCase,
    private readonly getAdminDetailUseCase: IGetAdminDetailUseCase
  ) {}

  updatePassword(parameters: IUpdatePasswordInputPort): Promise<Either<IErrorOutputPort, void>> {
    return this.updatePasswordUseCase.updatePassword(parameters)
  }

  getAdminList(
    parameters: IGetAdminListInputPort
  ): Promise<Either<IErrorOutputPort, IGetAdminListOutputPort>> {
    return this.getAdminListUseCase.getAdminListUseCase(parameters)
  }

  createAdmin(parameters: ICreateAdminInputPort): Promise<Either<IErrorOutputPort, void>> {
    return this.createAdminUseCase.createAdmin(parameters)
  }

  updateAdmin(parameters: IUpdateAdminInputPort): Promise<Either<IErrorOutputPort, void>> {
    return this.updateAdminUseCase.updateAdmin(parameters)
  }

  updateAdminStatus(
    parameters: IUpdateAdminStatusInputPort
  ): Promise<Either<IErrorOutputPort, void>> {
    return this.updateAdminStatusUseCase.updateAdminStatus(parameters)
  }

  deleteAdmin(parameters: IDeleteAdminInputPort): Promise<Either<IErrorOutputPort, void>> {
    return this.deleteAdminUseCase.deleteAdmin(parameters)
  }

  getAdminDetail(
    parameters: IGetAdminDetailInputPort
  ): Promise<Either<IErrorOutputPort, IGetAdminDetailOutputPort>> {
    return this.getAdminDetailUseCase.getAdminDetail(parameters)
  }
}

export default AdminController
