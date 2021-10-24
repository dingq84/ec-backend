import { useQueryClient } from 'react-query'
import { useState } from 'react'
import 'twin.macro'

// components
import Button from '@/components/shared/button'
import Dialog from '@/components/shared/dialog'
import useDrawerTemplate from '@/components/page/account/drawer/useDrawerTemplate'
import useDrawerReducer from '@/components/page/account/drawer/useDrawerReducer'

// constants
import { OperationMode } from '@/constants/common'
import { ApiKey } from '@/constants/services/api'

// core
import core from '@ec-backstage/core/src'
import { StatusCode } from '@ec-backstage/core/src/common/constants/statusCode'
import { IUpdateAdminInputPort } from '@ec-backstage/core/src/admin/application/interface/iUpdateAdminUseCase'
import { IDeleteAdminInputPort } from '@ec-backstage/core/src/admin/application/interface/iDeleteAdminUseCase'
import { Status } from '@ec-backstage/core/src/common/constants/status'
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

interface EditViewDrawerProps {
  mode: OperationMode
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
  const [modalProps, setModalProps] = useState({ open: false, callback: () => {}, message: '' })
  const { data: roleList, isLoading: roleListLoading } = useNormalQuery(
    ApiKey.roleList,
    () => core.role.getRoleList({ page: 1, orderBy: Order.Desc }),
    {
      enabled: open,
      staleTime: 600000
    }
  )
  const { data: adminData, isLoading: adminDataLoading } = useNormalQuery(
    [ApiKey.accountDetail, id, open],
    () => core.admin.getAdminDetail({ id }),
    {
      enabled: open && Boolean(roleList),
      staleTime: 600000
    }
  )
  const { isLoading: updateAdminLoading, mutate: updateAdminMutate } = useNormalMutation(
    (data: IUpdateAdminInputPort) => core.admin.updateAdmin(data),
    {
      onSettled() {
        closeModal()
      },
      onSuccess() {
        queryClient.invalidateQueries(ApiKey.accountList)
        queryClient.invalidateQueries([ApiKey.accountDetail, id])
        reduxDispatch(
          pushToast({ show: true, level: 'success', message: `「${state.name}」帳號編輯成功` })
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
  const { isLoading: deleteAdminLoading, mutate: deleteAdminMutate } = useNormalMutation(
    ({ id }: IDeleteAdminInputPort) => core.admin.deleteAdmin({ id }),
    {
      onSuccess() {
        queryClient.invalidateQueries([ApiKey.roleList])
        reduxDispatch(
          pushToast({ show: true, level: 'success', message: `「${state.name}」帳號刪除成功` })
        )
        close()
      }
    }
  )

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

  useEnhancedEffect(() => {
    if (adminData) {
      const { name, status, account, roleId } = adminData
      dispatch({ type: 'updateName', payload: { name } })
      dispatch({ type: 'updateStatus', payload: { status } })
      dispatch({ type: 'updateAccount', payload: { account } })
      dispatch({ type: 'updateRoleId', payload: { roleId: roleId.toString() } })
    }
  }, [adminData])

  const submit = (): void => {
    updateAdminMutate({ ...state, roleId: Number(state.roleId), id })
  }

  const submitModal = (): void => {
    if (state.status === Status.inactive) {
      setModalProps({ open: true, callback: submit, message: '確定要停用此帳號？' })
    } else {
      submit()
    }
  }

  const closeModal = (): void => {
    setModalProps({ ...modalProps, open: false })
  }

  const handleDelete = (): void => {
    setModalProps({
      open: true,
      callback: () => deleteAdminMutate({ id }),
      message: '確定要刪除此帳號？'
    })
  }

  const { element, handleErrorTarget } = useDrawerTemplate({
    open,
    close,
    mode,
    title: mode === OperationMode.edit ? '編輯' : '檢視',
    submit: submitModal,
    submitLabel: '儲存',
    state,
    dispatch,
    changeModeToEdit,
    isLoading: roleListLoading || adminDataLoading || updateAdminLoading || deleteAdminLoading,
    slots: {
      delete:
        mode === OperationMode.edit ? (
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
      <Dialog
        open={modalProps.open}
        content={
          <div tw="pt-5 py-6 w-full px-15">
            <h1 tw="font-medium text-black text-2xl mb-6 text-center">系統提醒</h1>
            <p tw="text-lg font-normal text-black text-center mb-6 whitespace-pre">
              {modalProps.message}
            </p>
          </div>
        }
        Footer={
          <div className="flex-center" tw="pb-9">
            <Button label="取消" className="btn-outline" onClick={closeModal} />
            <Button label="確認" className="btn" tw="ml-10" onClick={submit} />
          </div>
        }
        close={closeModal}
      />
    </>
  )
}

export default EditViewDrawer
