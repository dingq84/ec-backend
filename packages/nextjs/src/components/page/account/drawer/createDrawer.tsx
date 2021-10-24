import { useQueryClient } from 'react-query'

// components
import useDrawerTemplate from '@/components/page/account/drawer/useDrawerTemplate'
import useDrawerReducer from '@/components/page/account/drawer/useDrawerReducer'

// constants
import { OperationMode } from '@/constants/common'
import { ApiKey } from '@/constants/services/api'

// core
import core from '@ec-backstage/core/src'
import { StatusCode } from '@ec-backstage/core/src/common/constants/statusCode'
import { ICreateAdminInputPort } from '@ec-backstage/core/src/admin/application/interface/iCreateAdminUseCase'
import { Order } from '@ec-backstage/core/src/common/constants/order'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// services
import useNormalMutation from '@/services/useNormalMutation'
import useNormalQuery from '@/services/useNormalQuery'

// state
import { useAppDispatch } from '@/states/hooks'
import { pushToast } from '@/states/toast'
import { setError } from '@/states/error'

interface CreateDrawerProps {
  open: boolean
  close(): void
}

const CreateDrawer = (props: CreateDrawerProps) => {
  const { open, close } = props
  const queryClient = useQueryClient()
  const reduxDispatch = useAppDispatch()
  const [state, dispatch] = useDrawerReducer()
  const { data: roleList } = useNormalQuery(
    ApiKey.roleList,
    () => core.role.getRoleList({ page: 1, orderBy: Order.Desc }),
    {
      enabled: open,
      staleTime: 600000
    }
  )
  const { isLoading, mutate } = useNormalMutation(
    (data: ICreateAdminInputPort) => core.admin.createAdmin(data),
    {
      onSuccess() {
        queryClient.invalidateQueries(ApiKey.accountList)
        reduxDispatch(
          pushToast({ show: true, level: 'success', message: `「${state.name}」帳號新增成功` })
        )
        close()
      },
      onError(error) {
        const { errorMessage, statusCode } = error

        if (
          [
            StatusCode.wrongAdminNameLength,
            StatusCode.adminNameOnlyChinese,
            StatusCode.accountIsExist
          ].includes(statusCode)
        ) {
          handleErrorTarget(['name'])
          reduxDispatch(pushToast({ show: true, level: 'warning', message: errorMessage }))
          return
        }

        if (StatusCode.parameterRequired === statusCode) {
          handleErrorTarget(['name', 'password', 'account', 'roleId'])
          reduxDispatch(pushToast({ show: true, level: 'warning', message: errorMessage }))
          return
        }

        reduxDispatch(setError({ show: true, message: errorMessage, statusCode }))
      }
    }
  )

  useEnhancedEffect(() => {
    if (open) {
      dispatch({ type: 'reset' })
    }
  }, [open])

  useEnhancedEffect(() => {
    if (roleList) {
      dispatch({
        type: 'setRoleList',
        payload: {
          roleList: roleList.roles.map(role => ({
            key: role.id.toString(),
            value: role.name
          }))
        }
      })
    }
  }, [roleList])

  const { element, handleErrorTarget } = useDrawerTemplate({
    open,
    close,
    mode: OperationMode.create,
    title: '創建',
    submit: () => mutate({ ...state, roleId: Number(state.roleId) }),
    submitLabel: '新增',
    state,
    dispatch,
    isLoading
  })

  return element
}

export default CreateDrawer
