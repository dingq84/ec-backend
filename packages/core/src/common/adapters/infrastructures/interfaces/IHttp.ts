import { AxiosRequestConfig } from 'axios'
import { Either } from 'fp-ts/lib/Either'

// types
import { DataError } from '@/common/types/DataError'

export interface RequestConfig extends AxiosRequestConfig {
  withAuth?: boolean
}

export enum StatusCode {
  success = '0000',
  tokenCancel = '1001',
  tokenExpired = '1002'
}

export interface ResponseResult<T> {
  serverTime: string
  statusCode: StatusCode
  statusMessage: string
  statusCodeTitle: string
  data: T
}

export interface IHttp {
  storeToken(toke: string): void
  request<T>(requestConfig: RequestConfig): Promise<Either<DataError, ResponseResult<T>>>
}
