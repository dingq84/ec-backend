import { QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from 'react-query'

export function useNoCacheQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): UseQueryResult<TData, TError> {
  return useQuery(queryKey, queryFn, {
    ...options,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false
  })
}

export default useNoCacheQuery
