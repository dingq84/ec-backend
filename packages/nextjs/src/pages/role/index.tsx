import { useState } from 'react'
import tw, { css } from 'twin.macro'

// components
import Button from '@/components/shared/button'
import Paper from '@/components/shared/paper'
import Table from '@/components/shared/table'
import TextField from '@/components/shared/textField'
import { Tabs, Tab, TabList, TabPanel } from '@/components/shared/tab'

// constants
import { roleColumns } from '@/constants/pages/role'

// layouts
import DefaultLayout from '@/layouts/default'

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

interface SearchContainerProps {
  value: string
  onChange: (value: string) => void
  search: () => void
}

const SearchContainer = (props: SearchContainerProps) => {
  const { value, onChange, search } = props
  return (
    <Paper tw="w-full flex-col items-start py-4 px-5 mb-5">
      <span tw="text-black text-xs font-medium block">你想搜尋什麼？</span>
      <div tw="w-full flex items-center mt-2">
        <TextField
          placeholder="搜尋角色名稱"
          css={[inputCss]}
          value={value}
          onChange={onChange}
          clear={false}
        />
        <Button className="btn-outline" label="搜尋" onClick={search} />
      </div>
    </Paper>
  )
}

const Role = () => {
  const [keyword, setKeyword] = useState('')

  const handleKeywordChange = (value: string): void => {
    setKeyword(value)
  }

  const handleSearch = (): void => {
    console.log(keyword)
  }

  const handleEdit = (data: unknown): void => {
    console.log('edit', data)
  }

  const handleDelete = (data: unknown): void => {
    console.log('delete', data)
  }

  return (
    <main>
      <div tw="flex items-center justify-between">
        <h1 tw="text-blue-gray-3 font-medium text-2xl">角色權限管理</h1>
        <Button className="btn" label="創建角色" />
      </div>

      <Tabs>
        <TabList>
          <Tab>
            <span>全部角色</span>
          </Tab>
          <Tab>
            <span>已啟用角色</span>
          </Tab>
          <Tab>
            <span>已停用角色</span>
          </Tab>
        </TabList>

        <TabPanel>
          <SearchContainer value={keyword} onChange={handleKeywordChange} search={handleSearch} />

          <Table
            columns={roleColumns}
            data={[
              {
                name: 'test',
                createDate: '2021-10-10',
                status: 'active',
                edit: 'edit',
                delete: 'delete'
              },
              {
                name: 'test',
                createDate: '2021-10-10',
                status: 'active',
                edit: 'edit',
                delete: 'delete'
              },
              {
                name: 'test',
                createDate: '2021-10-10',
                status: 'active',
                edit: 'edit',
                delete: 'delete'
              },
              {
                name: 'test',
                createDate: '2021-10-10',
                status: 'active',
                edit: 'edit',
                delete: 'delete'
              }
            ]}
            pagination={{
              currentPage: 0,
              totalRows: 0,
              fetchData: () => {}
            }}
            handleFunctions={{
              edit: handleEdit,
              delete: handleDelete
            }}
          />
        </TabPanel>

        <TabPanel>
          <SearchContainer value={keyword} onChange={handleKeywordChange} search={handleSearch} />
          <span>2</span>
        </TabPanel>

        <TabPanel>
          <SearchContainer value={keyword} onChange={handleKeywordChange} search={handleSearch} />
          <span>3</span>
        </TabPanel>
      </Tabs>
    </main>
  )
}

Role.layout = DefaultLayout
// Role.auth = true

export default Role
