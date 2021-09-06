// core
import { IRoleDTO } from '@ec-backstage/core/src/role/domains/dto/RoleDTO'

// types
import { CustomColumn } from '@/types/components/table'

const columns: CustomColumn<IRoleDTO>[] = [
  {
    Header: '角色名稱',
    accessor: 'name',
    width: 187
  },
  {
    Header: '創建日期',
    accessor: 'createdAt',
    width: 201,
    disableSortBy: false
  },
  {
    Header: '角色狀態',
    accessor: 'status',
    width: 550,
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
