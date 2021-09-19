import { Either, isRight } from 'fp-ts/lib/Either'
import { QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from 'react-query'

// core
import { IErrorOutputPort } from '@ec-backstage/core/src/common/application/interface/iErrorUseCase'

// states
import { useAppDispatch } from '@/states/hooks'
import { setError } from '@/states/error'

function useNormalQuery<
  TQueryFnData = unknown,
  TError extends IErrorOutputPort = IErrorOutputPort,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<Either<TError, TQueryFnData>, TQueryKey>,
  options?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseQueryResult<TData, TError> {
  const dispatch = useAppDispatch()
  return useQuery(
    queryKey,
    async (...args) => {
      const result = await queryFn(...args)
      if (isRight(result)) {
        return result.right
      }

      throw result.left
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
      cacheTime: 3600000, // 一小時
      onError(error) {
        // 這便設定一個預設的全局錯誤處理
        const { errorMessage, statusCode } = error
        dispatch(setError({ show: true, message: errorMessage, statusCode }))
      },
      ...options
    }
  )
}

export default useNormalQuery
