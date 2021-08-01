import { AxiosRequestConfig } from 'axios'

export interface RequestConfig extends AxiosRequestConfig {
  withAuth?: boolean
}

export interface IHttp {
  storeToken(toke: string): void
  request<T>(requestConfig: RequestConfig): Promise<T>
}
