/**
 * @author Ding.Chen 2021-07-30
 * 參考下方網址的文章，透過 Either 的概念，做一個易擴充的 Error types 管理
 */

// 401
export interface UnAuthenticatedError {
  kind: 'UnAuthenticatedError'
}

// 403
export interface UnAuthorizedError {
  kind: 'UnAuthorizedError'
}

export interface ApiError {
  kind: 'ApiError'
  error: string
  statusCode: number
  message: string
}

// 401
export interface TokenExpiredError {
  kind: TokenExpiredError
}

// others
export interface UnexpectedError {
  kind: 'UnexpectedError'
  error: Error
}

export type DataError =
  | TokenExpiredError
  | UnAuthenticatedError
  | UnAuthorizedError
  | ApiError
  | UnexpectedError
