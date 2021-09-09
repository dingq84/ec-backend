import { useRouter } from 'next/router'
import { isLeft, isRight } from 'fp-ts/lib/Either'
import { useQuery } from 'react-query'
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

    const { data: isLogged, isLoading: isLoggedLoading } = useNoCacheQuery(ApiKey.isLogged, () =>
      core.auth.checkIsLogged()
    )
    const { data: meData, isLoading: isMeLoading } = useQuery(ApiKey.me, () => core.auth.getMe(), {
      enabled: isLogged === true,
      refetchOnWindowFocus: false,
      staleTime: 100000 // 十分鐘
    })

    useEnhancedEffect(() => {
      // 在每次檢查是否登入時，都會更新 me 的 state
      if (meData && isRight(meData)) {
        dispatch(setMe(meData.right))
      }
    }, [meData, dispatch])

    useEnhancedEffect(() => {
      if ((meData && isLeft(meData)) || isLogged === false) {
        dispatch(
          setError({
            message: '請先登入',
            callback: () => {
              router.push('/auth/login')
            }
          })
        )
      }
    }, [isLogged, meData, dispatch])

    if (isLoggedLoading || isMeLoading) {
      return <Loading isLoading />
    }

    if (!isLogged || (meData && isLeft(meData))) {
      return null
    }

    return <Component {...props} />
  }
}

export default withAuth
