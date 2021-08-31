import { FunctionTypes } from '@/types/components/table'

const roleColumns = [
  {
    Header: '角色名稱',
    accessor: 'name',
    width: 187
  },
  {
    Header: '創建日期',
    accessor: 'createDate',
    width: 201
  },
  {
    Header: '角色狀態',
    accessor: 'status',
    width: 550
  },
  {
    Header: '編輯',
    accessor: 'edit',
    width: 64,
    cellSlot: FunctionTypes.edit
  },
  {
    Header: '刪除',
    accessor: 'delete',
    width: 24,
    cellSlot: FunctionTypes.delete
  }
]

export { roleColumns }
