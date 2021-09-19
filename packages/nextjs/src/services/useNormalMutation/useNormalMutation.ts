import { Either, isRight } from 'fp-ts/lib/Either'
import { MutationFunction, useMutation, UseMutationOptions, UseMutationResult } from 'react-query'

// core
import { IErrorOutputPort } from '@ec-backstage/core/src/common/application/interface/iErrorUseCase'

// states
import { useAppDispatch } from '@/states/hooks'
import { setError } from '@/states/error'

function useNormalMutation<
  TData = unknown,
  TError extends IErrorOutputPort = IErrorOutputPort,
  TVariables = void,
  TContext = unknown
>(
  mutationFn: MutationFunction<Either<TError, TData>, TVariables>,
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> {
  const dispatch = useAppDispatch()
  return useMutation<TData, TError, TVariables, TContext>(
    async (args: TVariables) => {
      const result = await mutationFn(args)
      if (isRight(result)) {
        return result.right
      }

      throw result.left
    },
    {
      retry: 1,
      onError(error) {
        // 這便設定一個預設的全局錯誤處理
        const { errorMessage, statusCode } = error
        dispatch(setError({ show: true, message: errorMessage, statusCode }))
      },
      ...options
    }
  )
}

export default useNormalMutation
