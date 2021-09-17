import { useMutation, useQueryClient, useQuery } from 'react-query'
import { isLeft, isRight } from 'fp-ts/Either'
import { useState } from 'react'
import 'twin.macro'

// components
import Button from '@/components/shared/button'
import useDrawerTemplate from '@/components/page/role/drawer/useDrawerTemplate'
import useDrawerReducer from '@/components/page/role/drawer/useDrawerReducer'
import { ToastProps } from '@/components/shared/toast'
import RoleAffectedAccountsDialog from '@/components/page/role/affectedAccountsDialog'

// constants
import { ApiKey } from '@/constants/services/api'

// core
import core from '@ec-backstage/core/src'
import { StatusCode } from '@ec-backstage/core/src/common/constants/statusCode'
import { IUpdateRoleInputPort } from '@ec-backstage/core/src/role/application/interface/iUpdateRoleUseCase'
import { IDeleteRoleInputPort } from '@ec-backstage/core/src/role/application/interface/iDeleteRoleUseCase'
import { Status } from '@ec-backstage/core/src/common/constants/status'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// pages
import { Mode } from '@/pages/role'

// state
import { useAppDispatch } from '@/states/hooks'
import { setError } from '@/states/error'

interface EditViewDrawerProps {
  mode: Mode
  open: boolean
  close(): void
  changeModeToEdit(): void
  handleToast(toastProps: Pick<ToastProps, 'show' | 'level' | 'message'>): void
  id: number
}

const EditViewDrawer = (props: EditViewDrawerProps) => {
  const { mode, open, close, handleToast, id, changeModeToEdit } = props
  const queryClient = useQueryClient()
  const reduxDispatch = useAppDispatch()
  const [state, dispatch] = useDrawerReducer()
  const [modalProps, setModalProps] = useState({ open: false, id: -1, callback: () => {} })
  const { data: permissionData, isLoading: permissionDataLoading } = useQuery(
    [ApiKey.permissionList, open],
    () => core.permission.getPermissionList(),
    {
      enabled: open,
      refetchOnWindowFocus: false,
      staleTime: 600000
    }
  )
  const { data: roleData, isLoading: roleDataLoading } = useQuery(
    [ApiKey.roleDetail, id, open],
    () => core.role.getRoleDetail({ id }),
    {
      enabled: open && Boolean(permissionData),
      refetchOnWindowFocus: false,
      staleTime: 600000
    }
  )
  const { isLoading: updateRoleLoading, mutateAsync } = useMutation((data: IUpdateRoleInputPort) =>
    core.role.updateRole(data)
  )
  const deleteMutation = useMutation(({ id }: IDeleteRoleInputPort) => core.role.deleteRole({ id }))

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

  useEnhancedEffect(() => {
    if (roleData) {
      if (isLeft(roleData)) {
        const { errorMessage, statusCode } = roleData.left
        reduxDispatch(setError({ message: errorMessage, show: true, statusCode }))
        return
      }

      const { name, status, permissions } = roleData.right

      permissions.forEach(permission => {
        const { id } = permission
        const target = state.permissions.find(permission => permission.id === id)

        if (target) {
          dispatch({ type: 'updateParentPermission', payload: { id, value: true } })
          return
        }

        let index = state.permissions.findIndex(permission => permission.id > id)
        if (index === -1) {
          index = state.permissions.length - 1
        } else {
          index = index - 1
        }

        const parentId = state.permissions[index].id
        dispatch({ type: 'updateChildPermission', payload: { id, value: true, parentId } })
      })

      dispatch({ type: 'updateName', payload: { name } })
      dispatch({ type: 'updateStatus', payload: { status } })
    }
  }, [roleData])

  const submit = async (): Promise<void> => {
    const result = await mutateAsync({ ...state, id })
    if (isRight(result)) {
      queryClient.invalidateQueries(ApiKey.roleList)
      queryClient.invalidateQueries([ApiKey.roleDetail, id])

      handleToast({ show: true, level: 'success', message: `「${state.name}」角色編輯成功` })
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
      handleToast({ show: true, level: 'warning', message: errorMessage })

      if (statusCode === StatusCode.permissionIsEmpty) {
        handleErrorTarget(['permissions'])
      } else {
        handleErrorTarget(['name'])
      }
      return
    }

    reduxDispatch(setError({ message: errorMessage, show: true, statusCode }))
  }

  const handleSubmit = async (): Promise<void> => {
    if (state.status === Status.inactive) {
      setModalProps({ open: true, id, callback: submit })
    } else {
      submit()
    }
  }

  const closeModal = () => {
    setModalProps({ ...modalProps, open: false })
  }

  const handleDelete = () => {
    const callback = async () => {
      const result = await deleteMutation.mutateAsync({ id })

      if (isRight(result)) {
        queryClient.invalidateQueries([ApiKey.roleList])

        handleToast({ show: true, level: 'success', message: `「${state.name}」角色刪除成功` })
        close()
        return
      }

      const { errorMessage, statusCode } = result.left
      reduxDispatch(setError({ message: errorMessage, show: true, statusCode }))
    }

    setModalProps({ open: true, id, callback })
  }

  const { element, handleErrorTarget } = useDrawerTemplate({
    open,
    close,
    mode,
    title: mode === Mode.edit ? '編輯' : '檢視',
    submit: handleSubmit,
    state,
    dispatch,
    changeModeToEdit,
    isLoading: permissionDataLoading || roleDataLoading || updateRoleLoading,
    slots: {
      delete:
        mode === Mode.edit ? (
          <Button
            label="刪除"
            className="btn-outline"
            onClick={handleDelete}
            tw="text-red-3 border-red-3 hover:(text-white bg-red-3)"
          />
        ) : undefined
    }
  })

  return (
    <>
      {element}
      <RoleAffectedAccountsDialog {...modalProps} close={closeModal} />
    </>
  )
}

export default EditViewDrawer
