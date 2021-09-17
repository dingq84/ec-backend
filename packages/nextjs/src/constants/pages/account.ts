// core
import { IGetAccountOutputPort } from '@ec-backstage/core/src/admin/application/interface/iGetAccountListUseCase'

// types
import { CustomColumn } from '@/types/components/table'

const columns: CustomColumn<IGetAccountOutputPort>[] = [
  {
    Header: '管理者名稱',
    accessor: 'name',
    width: 135
  },
  {
    Header: '管理者帳號',
    accessor: 'account',
    width: 217
  },
  {
    Header: '創建日期',
    accessor: 'createdAt',
    width: 162,
    disableSortBy: false
  },
  {
    Header: '角色名稱',
    accessor: 'role',
    width: 183
  },
  {
    Header: '角色狀態',
    accessor: 'status',
    width: 292,
    cellSlot: 'status'
  },
  {
    Header: '編輯',
    width: 64,
    cellSlot: 'edit'
  },
  {
    Header: '刪除',
    width: 24,
    cellSlot: 'delete'
  }
]

export { columns }
