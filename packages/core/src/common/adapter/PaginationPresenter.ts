import { Either } from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'
import { either } from 'fp-ts'

import { IPaginationPresenter } from '@/common/adapter/interface/iPaginationPresenter'
import { IErrorOutputPort } from '@/common/application/interface/iErrorUseCase'
import {
  IPaginationInputPort,
  IPaginationOutputPort
} from '@/common/application/interface/iPaginationUseCase'

class PaginationPresenter implements IPaginationPresenter {
  present<T extends { pagination: IPaginationInputPort }>(
    data: Either<IErrorOutputPort, T>
  ): Either<IErrorOutputPort, T & { pagination: IPaginationOutputPort }> {
    return flow(
      either.map((raw: T) => ({
        ...raw,
        pagination: {
          total: raw.pagination.total,
          perPage: raw.pagination.perPage,
          currentPage: raw.pagination.currentPage,
          lastPage: raw.pagination.lastPage,
          from: raw.pagination.from,
          to: raw.pagination.to
        }
      }))
    )(data)
  }
}

export default PaginationPresenter
