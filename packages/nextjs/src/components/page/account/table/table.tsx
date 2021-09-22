import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { Row, SortingRule } from 'react-table'
import 'twin.macro'

// components
import Button from '@/components/shared/button'
import Dialog from '@/components/shared/dialog'
import DeleteButton from '@/components/shared/table/deleteButton'
import EditButton from '@/components/shared/table/editButton'
import Loading from '@/components/shared/loading'
import Switch from '@/components/shared/switch'
import Table from '@/components/shared/table'

// constants
import { ApiKey } from '@/constants/services/api'
import { columns } from '@/constants/pages/account'

// core
import core from '@ec-backstage/core/src'
import {
  IGetAdminOutputPort,
  IGetAdminListInputPort
} from '@ec-backstage/core/src/admin/application/interface/iGetAdminListUseCase'
import { Order } from '@ec-backstage/core/src/common/constants/order'
import { IDeleteAdminInputPort } from '@ec-backstage/core/src/admin/application/interface/iDeleteAdminUseCase'
import { IUpdateAdminStatusInputPort } from '@ec-backstage/core/src/admin/application/interface/iUpdateAdminStatusUseCase'
import { Status } from '@ec-backstage/core/src/common/constants/status'

// pages
import { Mode } from '@/pages/account'

// services
import useNormalQuery from '@/services/useNormalQuery'
import useNormalMutation from '@/services/useNormalMutation'

// states
import { useAppDispatch } from '@/states/hooks'
import { pushToast } from '@/states/toast'

interface AdminTableProps {
  keyword: string
  roleId: number | undefined
  status: IGetAdminListInputPort['status']
  openDrawer: (mode: Mode, id?: number) => void
}

const AdminTable = (props: AdminTableProps) => {
  const { keyword, status, roleId, openDrawer } = props
  const [page, setPage] = useState(1)
  const [desc, setDesc] = useState(true)
  const [modalProps, setModalProps] = useState({ open: false, message: '', callback: () => {} })
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  // get admin list
  const parameter = { orderBy: desc ? Order.Desc : Order.Asc, keyword, status, roleId, page }
  const { data, isLoading, isError } = useNormalQuery(
    [ApiKey.accountList, parameter],
    () => core.admin.getAdminList(parameter),
    {
      keepPreviousData: true,
      staleTime: 600000
    }
  )
  // update account status
  const { isLoading: updateAccountStatusLoading, mutate: updateAdminStatusMutate } =
    useNormalMutation((data: IUpdateAdminStatusInputPort) => core.admin.updateAdminStatus(data))
  // delete account
  const { isLoading: deleteAccountLoading, mutate: deleteAdminMutate } = useNormalMutation(
    ({ id }: IDeleteAdminInputPort) => core.admin.deleteAdmin({ id })
  )

  const handleSort = (rule: SortingRule<IGetAdminOutputPort>[]): void => {
    const { desc: newDesc } = rule[0]
    setDesc(newDesc || false)
  }

  const handleEdit = (data: Row<IGetAdminOutputPort>): void => {
    openDrawer(Mode.edit, data.original.id)
  }

  const handleDelete = async (data: Row<IGetAdminOutputPort>): Promise<void> => {
    const { id, name } = data.original
    const message = `「${name}」角色刪除成功`
    const callback = () =>
      deleteAdminMutate(
        { id },
        {
          onSuccess() {
            queryClient.removeQueries(ApiKey.accountList)
            dispatch(
              pushToast({
                message,
                show: true,
                level: 'success'
              })
            )
          }
        }
      )

    setModalProps({ open: true, callback, message: '確定要刪除此帳號？' })
  }

  const handleRowClick = (data: Row<IGetAdminOutputPort>): void => {
    openDrawer(Mode.view, data.original.id)
  }

  const handleStatusChange = async (
    value: boolean,
    data: Row<IGetAdminOutputPort>
  ): Promise<void> => {
    const { id, name } = data.original
    const message = `「${name}」角色${value ? '啟用' : '停用'}成功`
    const callback = async () => {
      const status = value ? Status.active : Status.inactive
      updateAdminStatusMutate(
        { id, status },
        {
          onSuccess() {
            queryClient.removeQueries(ApiKey.accountList)
            queryClient.removeQueries([ApiKey.accountDetail, id])
            dispatch(
              pushToast({
                message,
                show: true,
                level: 'success'
              })
            )
          }
        }
      )
    }

    if (value) {
      callback()
    } else {
      setModalProps({ open: true, callback, message: '確定要停用此帳號？' })
    }
  }

  const closeModal = (): void => {
    setModalProps({ ...modalProps, open: false })
  }

  const submitModal = (): void => {
    modalProps.callback()
    closeModal()
  }

  if (isError) {
    return null
  }

  return (
    <>
      <Loading isLoading={isLoading || deleteAccountLoading || updateAccountStatusLoading} />
      <Table<IGetAdminOutputPort>
        columns={columns}
        data={data?.accounts || []}
        pagination={{
          pageSize: 10,
          currentPage: page,
          totalRows: data?.pagination.total || 0,
          nextPage: pageCount => {
            setPage(page => page + pageCount)
          }
        }}
        slots={{
          edit: data => <EditButton onClick={() => handleEdit(data)} />,
          delete: data => <DeleteButton onClick={() => handleDelete(data)} />,
          status: data => (
            <Switch
              value={Boolean(data.original.status)}
              onChange={(value: boolean) => handleStatusChange(value, data)}
              label={data.original.statusText}
            />
          )
        }}
        handleSort={handleSort}
        handleRowClick={handleRowClick}
        tableOptions={{
          initialState: {
            pageIndex: page - 1,
            pageSize: 10,
            sortBy: [
              {
                id: 'createdAt',
                desc
              }
            ]
          }
        }}
      />

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
            <Button label="確認" className="btn" tw="ml-10" onClick={submitModal} />
          </div>
        }
        close={closeModal}
      />
    </>
  )
}

export default AdminTable
