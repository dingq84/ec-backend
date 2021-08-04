/**
 * @author Ding.Chen 2021-07-30
 * 參考下方網址的文章，透過 Either 的概念，做一個易擴充的 Error types 管理
 */

export enum ErrorTypes {
  network = 'NetworkError',
  authenticated = 'UnAuthenticatedError',
  authorized = 'UnAuthorizedError',
  api = 'ApiError',
  tokenExpired = 'TokenExpiredError',
  unexpected = 'UnexpectedError'
}

interface BasicError {
  kind: ErrorTypes
}

export interface NetworkError extends BasicError {
  kind: ErrorTypes.network
}

// 401
export interface UnAuthenticatedError extends BasicError {
  kind: ErrorTypes.authenticated
}

// 403
export interface UnAuthorizedError extends BasicError {
  kind: ErrorTypes.authorized
}

export interface ApiError extends BasicError {
  kind: ErrorTypes.api
  error: string
  statusCode: number
  message: string
}

// 401
export interface TokenExpiredError extends BasicError {
  kind: ErrorTypes.tokenExpired
}

// others
export interface UnexpectedError extends BasicError {
  kind: ErrorTypes.unexpected
  error: Error
}

export type DataError =
  | NetworkError
  | TokenExpiredError
  | UnAuthenticatedError
  | UnAuthorizedError
  | ApiError
  | UnexpectedError
