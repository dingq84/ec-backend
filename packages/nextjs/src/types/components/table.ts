import { Column } from 'react-table'

enum FunctionTypes {
  edit = 'edit',
  delete = 'delete'
}

type CustomColumn = Column & {
  align?: 'left' | 'center' | 'right'
  // header 和 cell 代表 table header 和 cell 是否需要外來 component
  headerSlot?: FunctionTypes
  cellSlot?: FunctionTypes
  // react table 的 column type 遺失 cell property，這邊新增一個幫助 ts 檢查
  Cell?: (row: unknown) => JSX.Element
}

export type { CustomColumn }
export { FunctionTypes }
