import { useMutation, useQueryClient, useQuery } from 'react-query'
import { isRight } from 'fp-ts/Either'

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
  const { data: permissionData } = useQuery(
    ApiKey.permissionList,
    () => core.permission.getPermissionList(),
    {
      enabled: open,
      refetchOnWindowFocus: false,
      staleTime: 600000
    }
  )
  const mutation = useMutation((data: ICreateRoleInputPort) => core.role.createRole(data), {
    onSuccess() {
      queryClient.invalidateQueries(ApiKey.roleList)
    }
  })

  useEnhancedEffect(() => {
    if (open) {
      dispatch({ type: 'reset' })
    }
  }, [open])

  useEnhancedEffect(() => {
    if (permissionData) {
      if (isRight(permissionData)) {
        dispatch({ type: 'setPermissionData', payload: { permissions: permissionData.right } })
      } else {
        const { errorMessage, statusCode } = permissionData.left
        reduxDispatch(setError({ message: errorMessage, show: true, statusCode }))
      }
    }
  }, [permissionData])

  const submit = async () => {
    const result = await mutation.mutateAsync(state)
    if (isRight(result)) {
      reduxDispatch(
        pushToast({ show: true, level: 'success', message: `「${state.name}」角色新增成功` })
      )
      close()
      return
    }

    const { statusCode, errorMessage } = result.left
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

  const { element, handleErrorTarget } = useDrawerTemplate({
    open,
    close,
    mode: Mode.create,
    title: '創建',
    submit,
    state,
    dispatch
  })

  return element
}

export default CreateDrawer
