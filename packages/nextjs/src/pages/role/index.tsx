import { useState } from 'react'
import tw, { css } from 'twin.macro'

// components
import Button from '@/components/shared/button'
import Paper from '@/components/shared/paper'
import { Tabs, Tab, TabList, TabPanel } from '@/components/shared/tab'
import TextField from '@/components/shared/textField'
import Toast, { ToastProps } from '@/components/shared/toast'
import RoleDrawer from '@/components/page/role/drawer'
import RoleTable from '@/components/page/role/table'

// core
import { Status } from '@ec-backstage/core/src/role/domain/interface/iRoleEntity'

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

export enum Mode {
  'create' = 'create',
  'edit' = 'edit',
  'view' = 'view'
}

const Role = () => {
  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState<Status>(-1)
  const [currentRoleId, setCurrentRoleId] = useState<number | undefined>(undefined)
  const [drawProps, setDrawProps] = useState({ open: false, mode: Mode.view })
  const [toastProps, setToastProps] = useState<Pick<ToastProps, 'level' | 'message' | 'show'>>({
    level: 'warning',
    message: '',
    show: false
  })
  const handleSearch = (newKeyword: string): void => {
    setKeyword(newKeyword)
  }

  const handleTabClick = (newStatus: Status): void => {
    setStatus(newStatus)
  }

  const changeModeToEdit = (): void => {
    setDrawProps({ ...drawProps, mode: Mode.edit })
  }

  const openDrawer = (mode: Mode, roleId: number | undefined = undefined): void => {
    setDrawProps({ open: true, mode })
    setCurrentRoleId(roleId)
  }

  const closeDrawer = (): void => {
    setDrawProps({ ...drawProps, open: false })
  }

  const handleToastProps = (newToastProps: typeof toastProps): void => {
    setToastProps({ ...toastProps, ...newToastProps })
  }

  return (
    <>
      <div tw="flex items-center justify-between">
        <h1 tw="text-blue-gray-3 font-medium text-2xl">角色權限管理</h1>
        <Button className="btn" label="創建角色" onClick={() => openDrawer(Mode.create)} />
      </div>

      <Tabs>
        <TabList>
          <Tab click={() => handleTabClick(-1)}>全部角色</Tab>
          <Tab click={() => handleTabClick(1)}>已啟用角色</Tab>
          <Tab click={() => handleTabClick(0)}>已停用角色</Tab>
        </TabList>

        <TabPanel>
          <SearchContainer value={keyword} search={handleSearch} />
          <RoleTable name={keyword} status={status} openDrawer={openDrawer} />
        </TabPanel>

        <TabPanel>
          <SearchContainer value={keyword} search={handleSearch} />
          <RoleTable name={keyword} status={status} openDrawer={openDrawer} />
        </TabPanel>

        <TabPanel>
          <SearchContainer value={keyword} search={handleSearch} />
          <RoleTable name={keyword} status={status} openDrawer={openDrawer} />
        </TabPanel>
      </Tabs>

      <RoleDrawer
        {...drawProps}
        close={closeDrawer}
        handleToast={handleToastProps}
        id={currentRoleId}
        changeModeToEdit={changeModeToEdit}
      />

      <Toast {...toastProps} close={() => setToastProps({ ...toastProps, show: false })} />
    </>
  )
}

Role.layout = DefaultLayout
Role.auth = true

export default Role
