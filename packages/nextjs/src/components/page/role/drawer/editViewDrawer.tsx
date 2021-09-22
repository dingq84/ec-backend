import { useQueryClient } from 'react-query'
import { useState } from 'react'
import 'twin.macro'

// components
import Button from '@/components/shared/button'
import RoleAffectedAccountsDialog from '@/components/page/role/affectedAccountsDialog'
import useDrawerTemplate from '@/components/page/role/drawer/useDrawerTemplate'
import useDrawerReducer from '@/components/page/role/drawer/useDrawerReducer'

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

// services
import useNormalQuery from '@/services/useNormalQuery'
import useNormalMutation from '@/services/useNormalMutation'

// state
import { useAppDispatch } from '@/states/hooks'
import { setError } from '@/states/error'
import { pushToast } from '@/states/toast'

interface EditViewDrawerProps {
  mode: Mode
  open: boolean
  close(): void
  changeModeToEdit(): void
  id: number
}

const EditViewDrawer = (props: EditViewDrawerProps) => {
  const { mode, open, close, id, changeModeToEdit } = props
  const queryClient = useQueryClient()
  const reduxDispatch = useAppDispatch()
  const [state, dispatch] = useDrawerReducer()
  const [modalProps, setModalProps] = useState({ open: false, id: -1, callback: () => {} })
  const { data: permissionData, isLoading: permissionDataLoading } = useNormalQuery(
    [ApiKey.permissionList, open],
    () => core.permission.getPermissionList(),
    {
      enabled: open
    }
  )
  const { data: roleData, isLoading: roleDataLoading } = useNormalQuery(
    [ApiKey.roleDetail, id, open],
    () => core.role.getRoleDetail({ id }),
    {
      enabled: open && Boolean(permissionData),
      staleTime: 600000
    }
  )
  const { isLoading: updateRoleLoading, mutate: updateRoleMutate } = useNormalMutation(
    (data: IUpdateRoleInputPort) => core.role.updateRole(data),
    {
      onSuccess(_, variables) {
        const { name } = variables
        queryClient.invalidateQueries(ApiKey.roleList)
        queryClient.invalidateQueries([ApiKey.roleDetail, id])
        reduxDispatch(
          pushToast({ show: true, level: 'success', message: `「${name}」角色編輯成功` })
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
  const { isLoading: deleteRoleLoading, mutate: deleteRoleMutate } = useNormalMutation(
    ({ id }: IDeleteRoleInputPort) => core.role.deleteRole({ id }),
    {
      onSuccess() {
        queryClient.invalidateQueries([ApiKey.roleList])
        reduxDispatch(
          pushToast({ show: true, level: 'success', message: `「${state.name}」角色刪除成功` })
        )
        close()
      }
    }
  )

  useEnhancedEffect(() => {
    if (permissionData) {
      dispatch({ type: 'setPermissionData', payload: { permissions: permissionData } })
    }
  }, [permissionData])

  useEnhancedEffect(() => {
    if (roleData) {
      const { name, status, permissions } = roleData
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

  const handleSubmit = (): void => {
    if (state.status === Status.inactive) {
      setModalProps({ open: true, id, callback: () => updateRoleMutate({ ...state, id }) })
    } else {
      updateRoleMutate({ ...state, id })
    }
  }

  const closeModal = (): void => {
    setModalProps({ ...modalProps, open: false })
  }

  const handleDelete = (): void => {
    setModalProps({ open: true, id, callback: () => deleteRoleMutate({ id }) })
  }

  const { element, handleErrorTarget } = useDrawerTemplate({
    open,
    close,
    mode,
    title: mode === Mode.edit ? '編輯' : '檢視',
    submit: handleSubmit,
    submitLabel: '儲存',
    state,
    dispatch,
    changeModeToEdit,
    isLoading: permissionDataLoading || roleDataLoading || updateRoleLoading || deleteRoleLoading,
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
