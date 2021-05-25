/**
 * @author Dean Chen 2021-05-20
 * Table 為包裝 react-table 的用法，釋出一個彈性的 table component，
 * 將 react-table 較不熟悉的語法包裝在這，對外僅由 columns 控制功能與否
 */

import { useMemo, forwardRef } from 'react'
import { useTable, useFlexLayout, useResizeColumns } from 'react-table'
import tw from 'twin.macro'

// components
import Paper from '@/components/common/paper'

// types
import { CustomColumn } from '@/types/table'

type TableProps = {
  columns: CustomColumn[]
  data: {}[]
  headerFixed?: boolean
}

const Table: React.ForwardRefRenderFunction<HTMLDivElement, TableProps> = (
  props: TableProps,
  ref
) => {
  const { columns, data, headerFixed = true } = props
  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400
    }),
    []
  )
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, headers } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useFlexLayout,
    useResizeColumns
  )

  return (
    /* eslint-disable react/jsx-key */
    <Paper
      ref={ref}
      {...getTableProps()}
      tw="inline-block w-full h-full p-0 overflow-auto relative"
    >
      <div css={[headerFixed && tw`sticky top-0`]}>
        {headerGroups.map(headerGroup => (
          <div {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <div
                tw="bg-primary px-3 py-4 text-light-gray-1 font-bold"
                {...column.getHeaderProps()}
              >
                {column.render('Header')}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <div {...row.getRowProps()} tw="hover:(bg-gray-100 shadow-lg cursor-pointer)">
              {row.cells.map((cell, i) => {
                return (
                  <div
                    css={[
                      tw`px-3 py-4`,
                      columns[i].align === 'center' && tw`text-center`,
                      columns[i].align === 'right' && tw`text-right`
                    ]}
                    {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </Paper>
  )
}

export default forwardRef(Table)
