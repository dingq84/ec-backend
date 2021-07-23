import { AxiosRequestConfig } from 'axios'

type CustomRequestConfig = AxiosRequestConfig & {
  withAuth?: Boolean
}

export type { CustomRequestConfig }
