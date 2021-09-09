import { AxiosRequestConfig } from 'axios'
import { Either } from 'fp-ts/lib/Either'

// constants
import { StatusCode } from '@/common/constants/statusCode'

// types
import { IErrorInputPort } from '@/common/application/interface/iErrorUseCase'

export interface RequestConfig extends AxiosRequestConfig {
  withAuth?: boolean
}

export interface ResponseResult<T> {
  serverTime: string
  statusCode: StatusCode
  statusMessage: string
  statusCodeTitle: string
  data: T
}

export interface IPaginationData {
  total: number // 總比數
  perPage: number // 每頁比數
  currentPage: number // 目前頁面
  lastPage: number // 最後一頁
  from: number // 資料起始點
  to: number // 資料終點
}

export interface IHttpInfrastructure {
  token: string
  request<T>(requestConfig: RequestConfig): Promise<Either<IErrorInputPort, ResponseResult<T>>>
}
