import { useQuery } from 'react-query'

// constants
import { ApiKey } from '@/constants/services/api'

// components
import Loading from '@/components/shared/loading'

// core
import core from '@ec-backstage/core/src'
import { StatusCode } from '@ec-backstage/core/src/common/constants/statusCode'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// service
import useNormalQuery from '@/services/useNormalQuery'

// states
import { setMe } from '@/states/me'
import { useAppDispatch } from '@/states/hooks'
import { setError } from '@/states/error'

function withAuth<T extends {}>(Component: React.ComponentType<T>) {
  return function WrapperComponent(props: T) {
    const dispatch = useAppDispatch()
    const dispatchNotLoggedError = (): void => {
      dispatch(
        setError({
          statusCode: StatusCode.tokenCancel,
          message: '請先登入',
          show: true
        })
      )
    }
    const {
      data: isLogged,
      isLoading: isLoggedLoading,
      isError: isLoggedError
    } = useQuery(
      ApiKey.isLogged,
      async () => {
        const isLogged = await core.auth.checkIsLogged()
        if (isLogged === false) {
          throw isLogged
        }

        return isLogged
      },
      {
        refetchOnWindowFocus: false,
        staleTime: 300000,
        onError() {
          dispatchNotLoggedError()
        }
      }
    )
    const {
      data: meData,
      isLoading: meLoading,
      isError: meDataError
    } = useNormalQuery(ApiKey.me, () => core.auth.getMe(), {
      enabled: isLogged === true,
      staleTime: 300000,
      onError() {
        dispatchNotLoggedError()
      }
    })

    useEnhancedEffect(() => {
      if (meData) {
        dispatch(setMe(meData))
      }
    }, [meData])

    if (isLoggedLoading || meLoading) {
      return <Loading isLoading />
    }

    if (isLoggedError || meDataError) {
      return null
    }

    return <Component {...props} />
  }
}

export default withAuth
