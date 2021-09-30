import { useQueryClient } from 'react-query'

// components
import useDrawerTemplate from '@/components/page/role/drawer/useDrawerTemplate'
import useDrawerReducer from '@/components/page/role/drawer/useDrawerReducer'

// constants
import { ApiKey } from '@/constants/services/api'

// core
import core from '@ec-backstage/core/src'
import { StatusCode } from '@ec-backstage/core/src/common/constants/statusCode'
import { ICreateRoleInputPort } from '@ec-backstage/core/src/role/application/interface/iCreateRoleUseCase'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// pages
import { Mode } from '@/pages/role'

// services
import useNormalQuery from '@/services/useNormalQuery'
import useNormalMutation from '@/services/useNormalMutation'

// state
import { useAppDispatch } from '@/states/hooks'
import { setError } from '@/states/error'
import { pushToast } from '@/states/toast'

interface CreateDrawerProps {
  open: boolean
  close(): void
}

const CreateDrawer = (props: CreateDrawerProps) => {
  const { open, close } = props
  const queryClient = useQueryClient()
  const reduxDispatch = useAppDispatch()
  const [state, dispatch] = useDrawerReducer()
  const { data: permissionData } = useNormalQuery(
    ApiKey.permissionList,
    () => core.permission.getPermissionList(),
    {
      enabled: open
    }
  )
  const { isLoading, mutate } = useNormalMutation(
    (data: ICreateRoleInputPort) => core.role.createRole(data),
    {
      onSuccess(_, variables) {
        const { name } = variables
        queryClient.invalidateQueries(ApiKey.roleList)
        reduxDispatch(
          pushToast({ show: true, level: 'success', message: `「${name}」角色新增成功` })
        )
        close()
      },
      onError(error) {
        const { statusCode, errorMessage } = error
        if (
          [
            StatusCode.wrongRoleNameFormat,
            StatusCode.permissionIsEmpty,
            StatusCode.roleNameIsExist
          ].includes(statusCode)
        ) {
          if (statusCode === StatusCode.permissionIsEmpty) {
            handleErrorTarget(['permissions'])
          } else {
            handleErrorTarget(['name'])
          }
          reduxDispatch(pushToast({ show: true, level: 'warning', message: errorMessage }))
          return
        }

        reduxDispatch(setError({ message: errorMessage, show: true, statusCode }))
      }
    }
  )

  useEnhancedEffect(() => {
    if (open) {
      dispatch({ type: 'reset' })
    }
  }, [open])

  useEnhancedEffect(() => {
    if (permissionData) {
      dispatch({ type: 'setPermissionData', payload: { permissions: permissionData } })
    }
  }, [permissionData, open])

  const { element, handleErrorTarget } = useDrawerTemplate({
    open,
    close,
    mode: Mode.create,
    title: '創建',
    submit: () => mutate(state),
    submitLabel: '新增',
    state,
    dispatch,
    isLoading
  })

  return element
}

export default CreateDrawer
