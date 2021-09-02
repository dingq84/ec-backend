import { useState } from 'react'
import { useQuery } from 'react-query'
import tw, { css } from 'twin.macro'

// components
import Button from '@/components/shared/button'
import DeleteButton from '@/components/shared/table/deleteButton'
import EditButton from '@/components/shared/table/editButton'
import Loading from '@/components/shared/loading'
import Paper from '@/components/shared/paper'
import Switch from '@/components/shared/switch'
import Table from '@/components/shared/table'
import { Tabs, Tab, TabList, TabPanel } from '@/components/shared/tab'
import TextField from '@/components/shared/textField'

// constants
import { columns } from '@/constants/pages/role'
import { ApiKey } from '@/constants/services/api'

// core
import core from '@ec-backstage/core/src'
import { IRoleDTO, Status } from '@ec-backstage/core/src/role/domains/dto/RoleDTO'
import { Order } from '@ec-backstage/core/src/common/constants/order'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// layouts
import DefaultLayout from '@/layouts/default'
import { isLeft } from 'fp-ts/lib/Either'

// states
import { useAppDispatch } from '@/states/global/hooks'
import { setError } from '@/states/global/error'
import { Row } from 'react-table'

const TableContainer = (props: { name: string; status: Status }) => {
  const { name, status } = props
  const [page, setPage] = useState(1)
  const dispatch = useAppDispatch()
  const { data, isLoading, isError } = useQuery(
    [ApiKey.roleList, { orderField: 'createAt', orderBy: Order, name, status, page }],
    () =>
      core.role.getRoleList({ orderField: 'createAt', orderBy: Order.Desc, name, status, page }),
    {
      refetchOnWindowFocus: false
    }
  )

  useEnhancedEffect(() => {
    if (data && isLeft(data)) {
      const { errorMessage } = data.left
      dispatch(setError({ message: errorMessage }))
    }

    if (isError) {
      dispatch(setError({ message: '系統繁忙中 請稍後再試' }))
    }
  }, [isError, data])

  if (isLoading) {
    return <Loading isLoading={isLoading} />
  }

  if ((data && isLeft(data)) || isError) {
    return null
  }

  const { roles, pagination } = data!.right
  const { total } = pagination

  const handleEdit = (data: Row<IRoleDTO>): void => {
    console.log('edit', data.original)
  }

  const handleDelete = (data: Row<IRoleDTO>): void => {
    console.log('delete', data)
  }

  const handleStatusChange = (data: Row<IRoleDTO>): void => {
    console.log('status', data)
  }

  return (
    <Table<IRoleDTO>
      columns={columns}
      data={roles}
      pagination={{
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
            onChange={() => handleStatusChange(data)}
            label={data.original.statusText}
          />
        )
      }}
    />
  )
}

const inputCss = css`
  & {
    ${tw`flex-grow mr-5`}

    & > div > div {
      ${tw`bg-blue-1`}
    }

    & input {
      ${tw`text-sm`}
    }
  }
`
const SearchContainer = (props: { value: string; search: (name: string) => void }) => {
  const { value, search } = props
  const [name, setName] = useState(value)

  const handleChange = (newName: string): void => {
    setName(newName)
  }

  const handleClick = (): void => {
    search(name)
  }

  return (
    <Paper tw="w-full flex-col items-start py-4 px-5 mb-5">
      <span tw="text-black text-xs font-medium block">你想搜尋什麼？</span>
      <div tw="w-full flex items-center mt-2">
        <TextField
          placeholder="搜尋角色名稱"
          css={[inputCss]}
          value={name}
          onChange={handleChange}
          onClear={() => setName('')}
          tabIndex={1}
        />
        <Button className="btn-outline" label="搜尋" onClick={handleClick} tabIndex={2} />
      </div>
    </Paper>
  )
}

const Role = () => {
  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState<Status>(-1)

  const handleSearch = (newKeyword: string): void => {
    setKeyword(newKeyword)
  }

  const handleTabClick = (newStatus: Status): void => {
    setStatus(newStatus)
  }

  return (
    <>
      <div tw="flex items-center justify-between">
        <h1 tw="text-blue-gray-3 font-medium text-2xl">角色權限管理</h1>
        <Button className="btn" label="創建角色" />
      </div>

      <Tabs>
        <TabList>
          <Tab click={() => handleTabClick(-1)}>全部角色</Tab>
          <Tab click={() => handleTabClick(1)}>已啟用角色</Tab>
          <Tab click={() => handleTabClick(0)}>已停用角色</Tab>
        </TabList>

        <TabPanel>
          <SearchContainer value={keyword} search={handleSearch} />
          <TableContainer name={keyword} status={status} />
        </TabPanel>

        <TabPanel>
          <SearchContainer value={keyword} search={handleSearch} />
          <TableContainer name={keyword} status={status} />
        </TabPanel>

        <TabPanel>
          <SearchContainer value={keyword} search={handleSearch} />
          <TableContainer name={keyword} status={status} />
        </TabPanel>
      </Tabs>
    </>
  )
}

Role.layout = DefaultLayout
Role.auth = true

export default Role
