import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'

export interface IUpdatePasswordInputPort {
  oldPassword: string
  newPassword1: string
  newPassword2: string
  accountId: number
}

export interface IUpdatePasswordUseCase {
  updatePassword(parameters: IUpdatePasswordInputPort): Promise<Either<IErrorOutputPort, void>>
}
