import { isLeft, isRight } from 'fp-ts/lib/Either'
import { useQuery } from 'react-query'
import 'twin.macro'

// constants
import { ApiKey } from '@/constants/services/api'

// components
import Loading from '@/components/shared/loading'

// core
import core from '@ec-backstage/core/src'
import { StatusCode } from '@ec-backstage/core/src/common/constants/statusCode'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// states
import { setMe } from '@/states/me'
import { useAppDispatch } from '@/states/hooks'
import { setError } from '@/states/error'

function withAuth<T extends {}>(Component: React.ComponentType<T>) {
  return function WrapperComponent(props: T) {
    const dispatch = useAppDispatch()
    const { data: isLogged, isLoading: isLoggedLoading } = useQuery(
      ApiKey.isLogged,
      () => core.auth.checkIsLogged(),
      {
        staleTime: 10000
      }
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
            statusCode: StatusCode.tokenCancel,
            message: '請先登入',
            show: true
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
