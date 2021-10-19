import { Either } from 'fp-ts/lib/Either'

import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import {
  IPaginationInputPort,
  IPaginationOutputPort
} from '@/common/application/interface/iPaginationUseCase'

export interface IPaginationPresenter {
  present<T extends { pagination: IPaginationInputPort }>(
    data: Either<IErrorOutputPort, T>
  ): Either<IErrorOutputPort, T & { pagination: IPaginationOutputPort }>
}
