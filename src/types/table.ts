import { Column } from 'react-table'

type CustomColumn = Column & {
  align?: 'left' | 'center' | 'right'
}

export type { CustomColumn }
