import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'

export interface ILoginInputPort {
  account: string
  password: string
}

export interface ILoginOutputPort {
  accessToken: string
}

export interface ILoginUseCase {
  login(parameters: ILoginInputPort): Promise<Either<IErrorOutputPort, ILoginOutputPort>>
}
