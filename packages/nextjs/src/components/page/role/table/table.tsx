import { useQueryClient } from 'react-query'
import { useState } from 'react'
import { Row, SortingRule } from 'react-table'
import 'twin.macro'

// components
import DeleteButton from '@/components/shared/table/deleteButton'
import EditButton from '@/components/shared/table/editButton'
import Loading from '@/components/shared/loading'
import Switch from '@/components/shared/switch'
import Table from '@/components/shared/table'
import RoleAffectedAccountsDialog from '@/components/page/role/affectedAccountsDialog'

// constants
import { columns } from '@/constants/pages/role'
import { ApiKey } from '@/constants/services/api'

// core
import core from '@ec-backstage/core/src'
import {
  IGetRoleListInputPort,
  IGetRoleOutput
} from '@ec-backstage/core/src/role/application/interface/iGetRoleListUseCase'
import { IUpdateRoleStatusInputPort } from '@ec-backstage/core/src/role/application/interface/iUpdateRoleStatusUseCase'
import { IDeleteRoleInputPort } from '@ec-backstage/core/src/role/application/interface/iDeleteRoleUseCase'
import { Order } from '@ec-backstage/core/src/common/constants/order'
import { Status } from '@ec-backstage/core/src/common/constants/status'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// pages
import { Mode } from '@/pages/role'

// services
import useNormalQuery from '@/services/useNormalQuery'
import useNormalMutation from '@/services/useNormalMutation'

// states
import { useAppDispatch } from '@/states/hooks'
import { pushToast } from '@/states/toast'

interface RoleTableProps {
  openDrawer: (mode: Mode, id?: number) => void
  name: string
  status: IGetRoleListInputPort['status']
}

const RoleTable = (props: RoleTableProps) => {
  const { name, status, openDrawer } = props
  const [page, setPage] = useState(1)
  const [desc, setDesc] = useState(true)
  const [modalProps, setModalProps] = useState({ open: false, id: -1, callback: () => {} })
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  // get role list
  const parameter = { orderBy: desc ? Order.Desc : Order.Asc, name, status, page }
  const { data, isLoading, isError } = useNormalQuery(
    [ApiKey.roleList, parameter],
    () => core.role.getRoleList(parameter),
    {
      keepPreviousData: true
    }
  )
  // update role status
  const { isLoading: updateRoleStatusLoading, mutate: updateRoleStatusMutate } = useNormalMutation(
    (data: IUpdateRoleStatusInputPort) => core.role.updateRoleStatus(data),
    {
      onSuccess(_, variables) {
        console.log(variables)
      }
    }
  )
  // delete role
  const { isLoading: deleteRoleLoading, mutate: deleteRoleMutate } = useNormalMutation(
    ({ id }: IDeleteRoleInputPort) => core.role.deleteRole({ id })
  )

  useEnhancedEffect(() => {
    // 角色狀態變更，表示切換頁籤，所以重設 page 和 desc
    setPage(1)
    setDesc(true)
  }, [status])

  const handleSort = (rule: SortingRule<IGetRoleOutput>[]): void => {
    const { desc: newDesc } = rule[0]
    setDesc(newDesc || false)
  }

  const handleEdit = (data: Row<IGetRoleOutput>): void => {
    openDrawer(Mode.edit, data.original.id)
  }

  const handleDelete = async (data: Row<IGetRoleOutput>): Promise<void> => {
    const { id, name } = data.original
    const message = `「${name}」角色刪除成功`
    const callback = () => {
      deleteRoleMutate(
        { id },
        {
          onSuccess() {
            queryClient.removeQueries(ApiKey.roleList)
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

    setModalProps({ open: true, id, callback })
  }

  const handleStatusChange = async (value: boolean, data: Row<IGetRoleOutput>): Promise<void> => {
    const { id, name } = data.original
    const message = `「${name}」角色${value ? '啟用' : '停用'}成功`
    const callback = () => {
      const status = value ? Status.active : Status.inactive
      updateRoleStatusMutate(
        { id, status },
        {
          onSuccess() {
            queryClient.removeQueries(ApiKey.roleList)
            queryClient.removeQueries([ApiKey.roleDetail, id])
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
      setModalProps({ open: true, id, callback })
    }
  }

  const handleRowClick = (data: Row<IGetRoleOutput>): void => {
    openDrawer(Mode.view, data.original.id)
  }

  const closeModal = (): void => {
    setModalProps({ ...modalProps, open: false })
  }

  if (isError) {
    return null
  }

  return (
    <>
      <Loading isLoading={isLoading || updateRoleStatusLoading || deleteRoleLoading} />
      <Table<IGetRoleOutput>
        columns={columns}
        data={data?.roles || []}
        pagination={{
          pageSize: 10,
          currentPage: page,
          lastPage: data?.pagination.lastPage || page,
          totalRows: data?.pagination?.total || 0,
          nextPage: pageCount => {
            setPage(page => page + pageCount)
          },
          goPage: page => setPage(page)
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
      <RoleAffectedAccountsDialog {...modalProps} close={closeModal} />
    </>
  )
}

export default RoleTable
