import { AxiosRequestConfig } from 'axios'
import { Either } from 'fp-ts/lib/Either'

// constants
import { StatusCode } from '@/common/constants/statusCode'

// types
import { IErrorParameters } from '@/common/domains/dto/ErrorDTO'

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

export interface IHttp {
  token: string
  request<T>(requestConfig: RequestConfig): Promise<Either<IErrorParameters, ResponseResult<T>>>
}
