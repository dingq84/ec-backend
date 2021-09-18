import { useState } from 'react'
import { useQuery } from 'react-query'
import { isLeft, isRight } from 'fp-ts/lib/Either'
import { Row, SortingRule } from 'react-table'

// components
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

// states
// import { useAppDispatch } from '@/states/global/hooks'

interface AdminTableProps {
  keyword: string
  roleId: number | undefined
  status: IGetAdminListInputPort['status']
}

const AdminTable = (props: AdminTableProps) => {
  const { keyword, status, roleId } = props
  const [page, setPage] = useState(1)
  const [desc, setDesc] = useState(true)
  // const dispatch = useAppDispatch()
  // const queryClient = useQueryClient()
  // get role list
  const parameter = { orderBy: desc ? Order.Desc : Order.Asc, keyword, status, roleId, page }
  const { data, isLoading } = useQuery(
    [ApiKey.accountList, parameter],
    () => core.admin.getAdminList(parameter),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: 60000 // 相同 query 值 cache 60秒
    }
  )

  if (data && isLeft(data)) {
    return null
  }

  const handleSort = (rule: SortingRule<IGetAdminOutputPort>[]): void => {
    const { desc: newDesc } = rule[0]
    setDesc(newDesc || false)
  }

  const handleEdit = (data: Row<IGetAdminOutputPort>): void => {
    console.log(data)
  }

  const handleDelete = async (data: Row<IGetAdminOutputPort>): Promise<void> => {
    console.log(data)
  }

  const handleRowClick = (data: Row<IGetAdminOutputPort>): void => {
    console.log(data)
  }

  const handleStatusChange = async (
    value: boolean,
    data: Row<IGetAdminOutputPort>
  ): Promise<void> => {
    console.log(value, data)
  }

  return (
    <>
      <Loading isLoading={isLoading} />
      <Table<IGetAdminOutputPort>
        columns={columns}
        data={data && isRight(data) ? data.right.accounts : []}
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
    </>
  )
}

export default AdminTable
