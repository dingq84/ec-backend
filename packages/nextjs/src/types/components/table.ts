import { CellProps, Column, Renderer } from 'react-table'

type CustomColumn<T extends object = {}, D extends object = {}, V = any> = Column<T> & {
  align?: 'left' | 'center' | 'right'
  // header 和 cell 代表 table header 和 cell 是否需要外來 component
  headerSlot?: string
  cellSlot?: string
  // react table 的 column type 遺失 cell property，這邊新增一個幫助 ts 檢查
  Cell?: Renderer<CellProps<D, V>>
}

export type { CustomColumn }
