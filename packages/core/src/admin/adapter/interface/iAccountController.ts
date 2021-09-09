import { Either } from 'fp-ts/lib/Either'

import { IUpdatePasswordInputPort } from '@/admin/application/interface/iUpdatePasswordUseCase'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'

export interface IAccountController {
  updatePassword(parameters: IUpdatePasswordInputPort): Promise<Either<IErrorOutputPort, void>>
}
