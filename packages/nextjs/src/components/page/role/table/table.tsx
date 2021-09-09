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

// constants
import { columns } from '@/constants/pages/role'
import { ApiKey } from '@/constants/services/api'

// core
import core from '@ec-backstage/core/src'
import { IGetRoleOutput } from '@ec-backstage/core/src/role/application/interface/iGetRoleListUseCase'
import { Status } from '@ec-backstage/core/src/role/domain/interface/iRoleEntity'
import { Order } from '@ec-backstage/core/src/common/constants/order'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// pages
import { Mode } from '@/pages/role'

// states
import { useAppDispatch } from '@/states/global/hooks'
import { setError } from '@/states/global/error'

interface RoleTableProps {
  openDrawer: (mode: Mode) => void
  name: string
  status: Status
}

const RoleTable = (props: RoleTableProps) => {
  const { name, status, openDrawer } = props
  const [page, setPage] = useState(1)
  const [desc, setDesc] = useState(true)
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
  const updateStatusMutation = useMutation((data: { id: number; status: Status }) =>
    core.role.updateRoleStatus(data)
  )
  // delete role
  const deleteMutation = useMutation((id: number) => core.role.deleteRole({ id }))

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
    console.log('edit', data.original)
    openDrawer('edit')
  }

  const handleDelete = async (data: Row<IGetRoleOutput>): Promise<void> => {
    const id = data.original.id
    const result = await deleteMutation.mutateAsync(id)

    if (isRight(result)) {
      queryClient.invalidateQueries([ApiKey.roleList])
      return
    }

    const { errorMessage } = result.left
    dispatch(setError({ message: errorMessage }))
  }

  const handleStatusChange = async (value: boolean, data: Row<IGetRoleOutput>): Promise<void> => {
    const status = value ? Status.active : Status.inactive
    const id = data.original.id
    const result = await updateStatusMutation.mutateAsync({ id, status })

    if (isRight(result)) {
      queryClient.invalidateQueries([ApiKey.roleList])
      return
    }

    const { errorMessage } = result.left
    dispatch(setError({ message: errorMessage }))
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
  )
}

export default RoleTable
