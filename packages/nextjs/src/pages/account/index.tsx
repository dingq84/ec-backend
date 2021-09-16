import { useState, memo } from 'react'
import tw, { css } from 'twin.macro'
import { useQuery } from 'react-query'
import { isRight } from 'fp-ts/lib/Either'

// components
import Button from '@/components/shared/button'
import Paper from '@/components/shared/paper'
import { Tabs, Tab, TabList, TabPanel } from '@/components/shared/tab'
import Select from '@/components/shared/select'
import TextField from '@/components/shared/textField'

// constants
import { ApiKey } from '@/constants/services/api'

// core
import core from '@ec-backstage/core/src'
import { Order } from '@ec-backstage/core/src/common/constants/order'

// layouts
import DefaultLayout from '@/layouts/default'
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

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
    ${tw`text-gray-3 text-xs`}
  }

  & label {
    ${tw`text-xs mb-2`}
  }
`

interface SearchContainer {
  name: string
  roleId: number | undefined
  search: (name: string, role: string) => void
}

const SearchContainer = memo(
  (props: SearchContainer) => {
    const { name: propName, roleId: propRoleId, search } = props
    const [name, setName] = useState(propName)
    const [roleId, setRoleId] = useState(propRoleId === undefined ? '' : propRoleId.toString())
    const [roleList, setRoleList] = useState<Option[]>([{ key: '', value: '全部' }])
    const { data } = useQuery(
      ApiKey.roleList,
      () => core.role.getRoleList({ orderBy: Order.Desc, page: 1 }),
      {
        refetchOnWindowFocus: false,
        staleTime: 600000
      }
    )

    useEnhancedEffect(() => {
      setName(propName)
      if (propRoleId === undefined) {
        setRoleId('')
      } else {
        setRoleId(propRoleId.toString())
      }
    }, [propName, propRoleId])

    useEnhancedEffect(() => {
      if (data) {
        if (isRight(data)) {
          setRoleList([
            ...roleList,
            ...data.right.roles.map(role => ({ key: role.id.toString(), value: role.name }))
          ])
        }
      }
    }, [data])

    const handleNameChange = (newName: string): void => {
      setName(newName)
    }

    const handleRoleChange = (value: string): void => {
      setRoleId(value)
    }

    const handleClick = (): void => {
      search(name, roleId)
    }

    return (
      <Paper tw="w-full flex-col items-start py-4 px-5 mb-5 relative">
        <span tw="text-black text-xs font-medium block absolute">你想搜尋什麼？</span>
        <div tw="w-full flex items-end">
          <TextField
            placeholder="搜尋管理者名稱、帳號"
            css={[inputCss]}
            value={name}
            onChange={handleNameChange}
            onClear={() => setName('')}
            tabIndex={1}
          />
          <Select
            value={roleId}
            options={roleList}
            inputProps={{ label: '角色名稱', clear: false }}
            css={[selectCss]}
            onChange={handleRoleChange}
            paperProps={{ css: [tw`text-gray-3 text-xs`] }}
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
    return prevProps.name === nextProps.name && prevProps.roleId === nextProps.roleId
  }
)

const Account = () => {
  const [name, setName] = useState('')
  const [roleId, setRoleId] = useState<undefined | number>(undefined)
  const [, setStatus] = useState(-1)

  const handleSearch = (name: string, roleId: string): void => {
    setName(name)
    setRoleId(Number(roleId))
  }

  const handleTabClick = (newStatus: number): void => {
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
          <SearchContainer name={name} roleId={roleId} search={handleSearch} />
        </TabPanel>

        <TabPanel>
          <SearchContainer name={name} roleId={roleId} search={handleSearch} />
        </TabPanel>

        <TabPanel>
          <SearchContainer name={name} roleId={roleId} search={handleSearch} />
        </TabPanel>
      </Tabs>
    </>
  )
}

Account.layout = DefaultLayout
Account.auth = true

export default Account
