/**
 * @author Dean Chen 2021-05-20
 * Table 為包裝 react-table 的用法，釋出一個彈性的 table component，
 * 將 react-table 較不熟悉的語法包裝在這，對外僅由 columns 控制功能與否
 *
 * @modified
 * [Dean Chen 2021-06-10]: 新增 Pagination
 */

import { useMemo, forwardRef, HTMLAttributes } from 'react'
import { useTable, useFlexLayout, useResizeColumns, usePagination } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import tw from 'twin.macro'

// components
import Button from '@/components/shared/button'
import Paper from '@/components/shared/paper'

// types
import type { CustomColumn } from '@/types/components/table'

interface TableProps extends HTMLAttributes<HTMLDivElement> {
  columns: CustomColumn[]
  data: {}[]
  headerFixed?: boolean
  pagination: {
    currentPage?: number // 目前第幾頁 (要)
    totalRows: number // 總共幾筆
    fetchData: Function // 換頁 call api
    pageSize?: number
  }
}

const Table = forwardRef<HTMLDivElement, TableProps>(function Table(props, ref) {
  const { columns, data, headerFixed = true, pagination, ...restProps } = props
  const { totalRows, currentPage = 0, pageSize = 10 } = pagination

  // 官方建議將 column 和 data 做 useMemo
  const memoColumns = useMemo(() => columns, [columns])
  const memoData = useMemo(() => data, [data])
  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400
    }),
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    canPreviousPage,
    canNextPage
  } = useTable(
    {
      columns: memoColumns,
      data: memoData,
      defaultColumn,
      initialState: { pageIndex: currentPage, pageSize },
      manualPagination: true,
      pageCount: totalRows
    },
    useFlexLayout,
    useResizeColumns,
    usePagination
  )
  const { pageIndex } = state

  return (
    /* eslint-disable react/jsx-key */
    <>
      <Paper
        ref={ref}
        tw="inline-block w-full h-full p-0 overflow-auto relative"
        {...getTableProps()}
        {...restProps}
      >
        <div css={[headerFixed && tw`sticky top-0`]}>
          {headerGroups.map(headerGroup => (
            <div {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <div
                  tw="bg-white border-b border-solid border-gray-2  px-3 py-4 text-gray-3"
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
              <div
                {...row.getRowProps()}
                tw="text-blue-2 border-b border-solid border-gray-2 hover:(bg-purple-1 shadow-lg cursor-pointer)"
              >
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
      <div tw="mt-4 flex items-center justify-center space-x-4">
        <Button
          className="btn-text"
          label={<FontAwesomeIcon icon={faChevronLeft} />}
          disabled={!canPreviousPage}
        />
        <Button className="btn" label={pageIndex + 1} />
        <Button
          className="btn-text"
          label={<FontAwesomeIcon icon={faChevronRight} />}
          disabled={!canNextPage}
        />
      </div>
    </>
  )
})

export default Table
