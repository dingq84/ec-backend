import { useMutation, useQuery, useQueryClient } from 'react-query'
import { isLeft, isRight } from 'fp-ts/lib/Either'
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

// states
import { useAppDispatch } from '@/states/hooks'
import { setError } from '@/states/error'

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
  const { data, isLoading } = useQuery(
    [ApiKey.roleList, parameter],
    () => core.role.getRoleList(parameter),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: 60000 // 相同 query 值 cache 60秒
    }
  )
  // update role status
  const { isLoading: updateRoleStatusLoading, mutateAsync: updateRoleStatusMutation } = useMutation(
    (data: IUpdateRoleStatusInputPort) => core.role.updateRoleStatus(data)
  )
  // delete role
  const { isLoading: deleteRoleLoading, mutateAsync: deleteRoleMutation } = useMutation(
    ({ id }: IDeleteRoleInputPort) => core.role.deleteRole({ id })
  )

  useEnhancedEffect(() => {
    // 角色狀態變更，表示切換頁籤，所以重設 page 和 desc
    setPage(1)
    setDesc(true)
  }, [status])

  useEnhancedEffect(() => {
    if (data && isLeft(data)) {
      const { errorMessage, statusCode } = data.left
      dispatch(setError({ message: errorMessage, show: true, statusCode }))
    }
  }, [data])

  const handleSort = (rule: SortingRule<IGetRoleOutput>[]): void => {
    const { desc: newDesc } = rule[0]
    setDesc(newDesc || false)
  }

  const handleEdit = (data: Row<IGetRoleOutput>): void => {
    openDrawer(Mode.edit, data.original.id)
  }

  const handleDelete = async (data: Row<IGetRoleOutput>): Promise<void> => {
    const id = data.original.id
    const callback = async () => {
      const result = await deleteRoleMutation({ id })

      if (isRight(result)) {
        queryClient.invalidateQueries([ApiKey.roleList])
        return
      }

      const { errorMessage, statusCode } = result.left
      dispatch(setError({ message: errorMessage, show: true, statusCode }))
    }

    setModalProps({ open: true, id, callback })
  }

  const handleStatusChange = async (value: boolean, data: Row<IGetRoleOutput>): Promise<void> => {
    const id = data.original.id
    const callback = async () => {
      const status = value ? Status.active : Status.inactive
      const result = await updateRoleStatusMutation({ id, status })

      if (isRight(result)) {
        queryClient.invalidateQueries([ApiKey.roleList])
        return
      }

      const { errorMessage, statusCode } = result.left
      dispatch(setError({ message: errorMessage, show: true, statusCode }))
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

  if (data && isLeft(data)) {
    return null
  }

  return (
    <>
      <Loading isLoading={isLoading || updateRoleStatusLoading || deleteRoleLoading} />
      <Table<IGetRoleOutput>
        columns={columns}
        data={data && isRight(data) ? data.right.roles : []}
        pagination={{
          pageSize: 10,
          currentPage: page,
          totalRows: data && isRight(data) ? data.right.pagination.total : 0,
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
      <RoleAffectedAccountsDialog {...modalProps} close={closeModal} />
    </>
  )
}

export default RoleTable
