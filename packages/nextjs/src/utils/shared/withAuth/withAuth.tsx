import { useRouter } from 'next/router'
import { isLeft, isRight } from 'fp-ts/lib/Either'
import { useQuery, useQueryClient } from 'react-query'
import 'twin.macro'

// constants
import { ApiKey } from '@/constants/services/api'

// components
import Loading from '@/components/shared/loading'

// core
import core from '@ec-backstage/core/src'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// services
import useNoCacheQuery from '@/services/useNoCacheQuery'

// states
import { setMe } from '@/states/global/me'
import { useAppDispatch } from '@/states/global/hooks'
import { setError } from '@/states/global/error'

function withAuth<T extends {}>(Component: React.ComponentType<T>) {
  return function WrapperComponent(props: T) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const queryClient = useQueryClient()
    // 1. 確認 accessToken 是否存在，存在的話跳至 3
    const accessToken = core.auth.token.getAccessToken()
    // 2. 如果不存在 accessToken，執行 refresh token api
    const { isLoading: refreshTokenIsLoading } = useNoCacheQuery(
      ApiKey.refreshToken,
      () => core.auth.token.refreshToken(),
      {
        enabled: !accessToken,
        onSuccess() {
          // 如果有執行 refreshToken，就重新執行 getMe
          queryClient.invalidateQueries(ApiKey.isLogged)
        }
      }
    )
    // 3. 執行 me api
    const { data, isLoading } = useQuery(ApiKey.isLogged, () => core.auth.me.getMe(), {
      enabled: !refreshTokenIsLoading,
      staleTime: 60000 // 緩存一分鐘
    })

    useEnhancedEffect(() => {
      // 在每次檢查是否登入時，都會更新 me 的 state
      if (data && isRight(data)) {
        dispatch(setMe(data.right))
      }
    }, [data, dispatch])

    useEnhancedEffect(() => {
      if (data && isLeft(data)) {
        const { errorMessage } = data.left
        dispatch(
          setError({
            message: errorMessage,
            callback: () => {
              router.push('/auth/login')
            }
          })
        )
      }
    }, [data, dispatch])

    if (isLoading || refreshTokenIsLoading) {
      return <Loading isLoading />
    }

    if (data && isLeft(data)) {
      return null
    }

    return <Component {...props} />
  }
}

export default withAuth
