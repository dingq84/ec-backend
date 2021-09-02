const columns = [
  {
    Header: '角色名稱',
    accessor: 'name',
    width: 187
  },
  {
    Header: '創建日期',
    accessor: 'createdAt',
    width: 201
  },
  {
    Header: '角色狀態',
    accessor: 'status',
    width: 550,
    cellSlot: 'status'
  },
  {
    Header: '編輯',
    accessor: 'edit',
    width: 64,
    cellSlot: 'edit'
  },
  {
    Header: '刪除',
    accessor: 'delete',
    width: 24,
    cellSlot: 'delete'
  }
]

export { columns }
