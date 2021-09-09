/**
 * @author Ding.Chen 2021-08-01
 * 考慮到 token 需要給整個 core 的 api 使用，原本想透過外部，每次執行 presenter 時傳進來，
 * 但有點不方便且累贅，網上並沒有相關資源可供參考，目前想到的方式為：
 * 1. token 儲存在這
 * 2. 為了防止 token 遺失，將 http 設計成 Singleton
 * * 針對第二點，其實 View 的 Dependency Injection，http 只會被 new 一次，所以不會有 token 遺失的問題，
 * 但還是先設計成 Singleton，避免未來問題
 */

import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { produce } from 'immer'
import { Either, left, right, map } from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { flow, pipe } from 'fp-ts/lib/function'

import createFormData from '@/common/utils/createFormData'
import isFormData from '@/common/utils/isFormData'
import {
  IHttpInfrastructure,
  RequestConfig,
  ResponseResult
} from '@/common/adapter/interface/iHttpInfrastructure'
import { StatusCode } from '@/common/constants/statusCode'
import { IErrorInputPort } from '@/common/application/interface/iErrorUseCase'

class Http implements IHttpInfrastructure {
  private static instance: IHttpInfrastructure

  private _token = ''

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  private getAxiosInstance(config: RequestConfig): Either<IErrorInputPort, AxiosInstance> {
    if (!config.baseURL) {
      config.baseURL = process.env.API_URL as string
    }

    // 無 headers 時，指定空物件，方便後續新增
    if (!config.headers) {
      config.headers = {}
    }

    if (!config.headers || !config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    }

    if (config.withAuth) {
      if (!this.token) {
        return left({ statusMessage: '請先登入', statusCode: StatusCode.tokenCancel })
      }

      config.headers.Authorization = this._token
    }

    return right(axios.create(config))
  }

  private getRequestConfig(config: RequestConfig): RequestConfig {
    if (isFormData(config)) {
      config = produce(config, draft => {
        draft.data = createFormData(Object.entries(config.data))
      })
    }

    return config
  }

  private processResponse<T extends unknown>(
    response: ResponseResult<T>
  ): Either<IErrorInputPort, ResponseResult<T>> {
    const { statusCode, statusMessage, data } = response
    switch (statusCode) {
      case StatusCode.success:
        return right(response)
      default:
        return left({ statusCode, statusMessage, data })
    }
  }

  private apiCall<T>(
    config: RequestConfig,
    instance: AxiosInstance
  ): TE.TaskEither<IErrorInputPort, AxiosResponse<ResponseResult<T>>> {
    return TE.tryCatch(
      () => instance(config),
      (reason: unknown) => {
        const statusMessage = String(reason).toLowerCase()
        if (statusMessage.includes('401')) {
          return { statusCode: StatusCode.tokenCancel, statusMessage }
        } else if (statusMessage.includes('403')) {
          return { statusCode: StatusCode.unauthorized, statusMessage }
        } else if (statusMessage.includes('network')) {
          return { statusCode: StatusCode.network, statusMessage }
        }

        return { statusCode: StatusCode.system, statusMessage }
      }
    )
  }

  get token(): string {
    return this._token
  }

  set token(token: string) {
    this._token = token
  }

  static getInstance(): IHttpInfrastructure {
    if (!Http.instance) {
      Http.instance = new Http()
    }

    return Http.instance
  }

  async request<T>(config: RequestConfig): Promise<Either<IErrorInputPort, ResponseResult<T>>> {
    const requestConfig = this.getRequestConfig(config)

    return await pipe(
      this.getAxiosInstance(config),
      flow(
        map((instance: AxiosInstance) => this.apiCall<T>(requestConfig, instance)),
        TE.fromEither
      ),
      TE.chain(TE.map(response => response.data)),
      TE.chain(flow(response => this.processResponse<T>(response), TE.fromEither))
    )()
  }
}

export default Http
