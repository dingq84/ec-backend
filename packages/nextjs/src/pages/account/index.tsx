import { useState, memo } from 'react'
import tw, { css } from 'twin.macro'

// components
import Button from '@/components/shared/button'
import Paper from '@/components/shared/paper'
import { Tabs, Tab, TabList, TabPanel } from '@/components/shared/tab'
import Select from '@/components/shared/select'
import TextField from '@/components/shared/textField'
import AdminTable from '@/components/page/account/table'

// constants
import { ApiKey } from '@/constants/services/api'

// core
import core from '@ec-backstage/core/src'
import { Order } from '@ec-backstage/core/src/common/constants/order'
import { Status } from '@ec-backstage/core/src/common/constants/status'

// layouts
import DefaultLayout from '@/layouts/default'
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// services
import useNormalQuery from '@/services/useNormalQuery'

// types
import { Option } from '@/types/components/input'

const inputCss = css`
  & {
    ${tw`flex-grow`}

    & > div > div {
      ${tw`bg-blue-1`}
    }

    & input {
      ${tw`text-sm placeholder:text-gray-3`}
    }
  }
`

const selectCss = css`
  & {
    width: 180px;
    ${tw`mx-5`}
  }

  & > div > div > div {
    ${tw`border-gray-1 text-gray-3`}
  }

  & input {
    ${tw`text-white text-xs placeholder:text-gray-3`}
  }

  & label {
    ${tw`text-xs mb-2`}
  }

  &[data-selected='true'] {
    & > div > div > div {
      ${tw`border-transparent bg-primary text-white`}
    }
  }
`

interface SearchContainer {
  keyword: string
  roleId: number | undefined
  search: (keyword: string, role: string) => void
}

const SearchContainer = memo(
  (props: SearchContainer) => {
    const { keyword: propKeyword, roleId: propRoleId, search } = props
    const [keyword, setKeyword] = useState(propKeyword)
    const [roleId, setRoleId] = useState(propRoleId === undefined ? '' : propRoleId.toString())
    const [roleList, setRoleList] = useState<Option[]>([])
    const { data } = useNormalQuery(
      ApiKey.roleList,
      () => core.role.getRoleList({ orderBy: Order.Desc, page: 1 }),
      {
        staleTime: 600000
      }
    )

    useEnhancedEffect(() => {
      setKeyword(propKeyword)
      if (propRoleId === undefined) {
        setRoleId('')
      } else {
        setRoleId(propRoleId.toString())
      }
    }, [propKeyword, propRoleId])

    useEnhancedEffect(() => {
      if (data) {
        setRoleList(data.roles.map(role => ({ key: role.id.toString(), value: role.name })))
      }
    }, [data])

    const handleNameChange = (newKeyword: string): void => {
      setKeyword(newKeyword)
    }

    const handleRoleChange = (newRoleId: string): void => {
      setRoleId(newRoleId)
    }

    const handleClick = (): void => {
      search(keyword, roleId)
    }

    return (
      <Paper tw="w-full flex-col items-start py-4 px-5 mb-5 relative">
        <span tw="text-black text-xs font-medium block absolute">你想搜尋什麼？</span>
        <div tw="w-full flex items-end">
          <TextField
            placeholder="搜尋管理者名稱、帳號"
            css={[inputCss]}
            value={keyword}
            onChange={handleNameChange}
            onClear={() => setKeyword('')}
            tabIndex={1}
          />
          <Select
            value={roleId}
            options={roleList}
            inputProps={{ label: '角色名稱', placeholder: '全部' }}
            css={[selectCss]}
            onChange={handleRoleChange}
            paperProps={{ css: [tw`text-gray-3 text-xs`] }}
            data-selected={String(roleId !== '')}
          />
          <Button
            className="btn-outline"
            tw="py-2 px-9 text-sm"
            label="搜尋"
            onClick={handleClick}
            tabIndex={2}
          />
        </div>
      </Paper>
    )
  },
  (prevProps, nextProps) => {
    return prevProps.keyword === nextProps.keyword && prevProps.roleId === nextProps.roleId
  }
)

const Admin = () => {
  const [keyword, setKeyword] = useState('')
  const [roleId, setRoleId] = useState<undefined | number>(undefined)
  const [status, setStatus] = useState<Status>(-1)

  const handleSearch = (newKeyword: string, newRoleId: string): void => {
    setKeyword(newKeyword)
    setRoleId(newRoleId === '' ? undefined : Number(newRoleId))
  }

  const handleTabClick = (newStatus: Status): void => {
    setStatus(newStatus)
  }

  return (
    <>
      <div tw="flex items-center justify-between">
        <h1 tw="text-blue-gray-3 font-medium text-2xl">帳號管理</h1>
        <Button className="btn" label="創建帳號" />
      </div>

      <Tabs>
        <TabList>
          <Tab click={() => handleTabClick(-1)}>全部帳號</Tab>
          <Tab click={() => handleTabClick(1)}>已啟用帳號</Tab>
          <Tab click={() => handleTabClick(0)}>已停用帳號</Tab>
        </TabList>

        <TabPanel>
          <SearchContainer keyword={keyword} roleId={roleId} search={handleSearch} />
          <AdminTable keyword={keyword} roleId={roleId} status={status} />
        </TabPanel>

        <TabPanel>
          <SearchContainer keyword={keyword} roleId={roleId} search={handleSearch} />
          <AdminTable keyword={keyword} roleId={roleId} status={status} />
        </TabPanel>

        <TabPanel>
          <SearchContainer keyword={keyword} roleId={roleId} search={handleSearch} />
          <AdminTable keyword={keyword} roleId={roleId} status={status} />
        </TabPanel>
      </Tabs>
    </>
  )
}

Admin.layout = DefaultLayout
Admin.auth = true

export default Admin
