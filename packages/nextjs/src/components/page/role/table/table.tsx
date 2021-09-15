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
import { Status } from '@/role/domain/interface/iRoleEntity'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// pages
import { Mode } from '@/pages/role'

// states
import { useAppDispatch } from '@/states/global/hooks'
import { setError } from '@/states/global/error'

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
  const updateStatusMutation = useMutation((data: IUpdateRoleStatusInputPort) =>
    core.role.updateRoleStatus(data)
  )
  // delete role
  const deleteMutation = useMutation(({ id }: IDeleteRoleInputPort) => core.role.deleteRole({ id }))

  useEnhancedEffect(() => {
    // 角色狀態變更，表示切換頁籤，所以重設 page 和 desc
    setPage(1)
    setDesc(true)
  }, [status])

  useEnhancedEffect(() => {
    if (data && isLeft(data)) {
      const { errorMessage } = data.left
      dispatch(setError({ message: errorMessage }))
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
      const result = await deleteMutation.mutateAsync({ id })

      if (isRight(result)) {
        queryClient.invalidateQueries([ApiKey.roleList])
        return
      }

      const { errorMessage } = result.left
      dispatch(setError({ message: errorMessage }))
    }

    setModalProps({ open: true, id, callback })
  }

  const handleStatusChange = async (value: boolean, data: Row<IGetRoleOutput>): Promise<void> => {
    const id = data.original.id
    const callback = async () => {
      const status = value ? Status.active : Status.inactive
      const result = await updateStatusMutation.mutateAsync({ id, status })

      if (isRight(result)) {
        queryClient.invalidateQueries([ApiKey.roleList])
        return
      }

      const { errorMessage } = result.left
      dispatch(setError({ message: errorMessage }))
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

  if (isLoading) {
    return <Loading isLoading={isLoading} />
  }

  if (data && isLeft(data)) {
    return null
  }

  const { roles, pagination } = data!.right
  const { total } = pagination
  const pageSize = 10

  return (
    <>
      <Table<IGetRoleOutput>
        columns={columns}
        data={roles}
        pagination={{
          pageSize,
          currentPage: page,
          totalRows: total,
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
            pageSize: pageSize,
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
