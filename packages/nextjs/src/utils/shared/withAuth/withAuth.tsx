/**
 * @author Dean Chen 2021-04-17
 * withAuth 這支主要負責處理權限的判斷，透過 next-auth 的 utils，判斷 session，並回傳對應的 Component
 *
 * @modified
 * [Dean Chen 2021-06-05]: 因為專案為 SSG，因此移除 next-auth，改用 client side 判斷
 */

import 'twin.macro'
import { useRouter } from 'next/router'
import { isLeft, isRight } from 'fp-ts/lib/Either'

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
    // 1. 確認 accessToken 是否存在，存在的話跳至 3
    const accessToken = core.auth.token.getAccessToken()
    // 2. 如果不存在 accessToken，執行 refresh token api
    const { isLoading: refreshTokenIsLoading } = useNoCacheQuery(
      ApiKey.refreshToken,
      () => core.auth.token.refreshToken(),
      {
        enabled: !accessToken
      }
    )
    // 3. 執行 me api
    const { data, isLoading, isError } = useNoCacheQuery(
      ApiKey.isLogged,
      () => core.auth.me.getMe(),
      {
        enabled: !refreshTokenIsLoading
      }
    )

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
      } else if (isError) {
        dispatch(
          setError({
            message: '請先進行登入',
            callback: () => {
              router.push('/auth/login')
            }
          })
        )
      }
    }, [isError, data, dispatch])

    if (isLoading || refreshTokenIsLoading) {
      return <Loading isLoading />
    }

    if (isError || (data && isLeft(data))) {
      return null
    }

    return <Component {...props} />
  }
}

export default withAuth
