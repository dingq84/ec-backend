import { useMemo, useState, useRef, HTMLAttributes, useCallback } from 'react'
import { useTable, useFlexLayout, useResizeColumns, usePagination, Row } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import tw from 'twin.macro'

// components
import Button from '@/components/shared/button'
import Paper from '@/components/shared/paper'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// types
import { CustomColumn } from '@/types/components/table'

interface TableProps<T extends object> extends HTMLAttributes<HTMLDivElement> {
  columns: CustomColumn[]
  data: Array<T>
  headerFixed?: boolean
  disabledPagination?: boolean
  handleRowClick?: (data: Row<T>) => void
  slots?: {
    [key: string]: (data: Row<T>) => JSX.Element
  }
  pagination: {
    currentPage?: number // 目前第幾頁 (要)
    totalRows: number // 總共幾筆
    nextPage: (page: number) => void // 換頁 call api
    pageSize?: number
  }
}

const Table = <T extends object>(props: TableProps<T>) => {
  const {
    columns,
    data,
    headerFixed = true,
    pagination,
    disabledPagination = false,
    slots,
    handleRowClick,
    ...restProps
  } = props
  const { totalRows, currentPage = 0, pageSize = 10, nextPage } = pagination
  const [totalWidth, setTotalWidth] = useState(1000)
  const ref = useRef<HTMLDivElement>(null!)
  const getColumnsSlot = useCallback(
    (slotName: string) => {
      if (slots === undefined) {
        return () => <span>{`請提供 ${slotName} 的 FC`}</span>
      }

      return slots[slotName]
    },
    [slots]
  )
  // 官方建議將 column 和 data 做 useMemo
  const memoColumns = useMemo(
    () =>
      columns.map(column => {
        if (column.headerSlot) {
          column.Header = ({ row }: { row: Row<T> }) => getColumnsSlot(column.headerSlot!)(row)
        } else if (column.cellSlot) {
          column.Cell = ({ row }: { row: Row<T> }) => getColumnsSlot(column.cellSlot!)(row)
        }

        return column
      }),
    [columns, getColumnsSlot]
  )
  const memoData = useMemo(() => data, [data])
  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 600
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
      initialState: { pageIndex: currentPage - 1, pageSize },
      manualPagination: true,
      pageCount: Math.ceil(totalRows / pageSize)
    },
    useFlexLayout,
    useResizeColumns,
    usePagination
  )
  const { pageIndex } = state

  useEnhancedEffect(() => {
    // 取 columns 的 width 總和和實際 element 的 width 兩者間較大的值，並設定回 table header 和 body
    const columnTotalWidth = memoColumns.reduce(
      (accumulate, { width = 0, minWidth = 0, maxWidth = 0 }) =>
        accumulate + Math.max(Number(width), minWidth, maxWidth),
      60
    )
    const { clientWidth } = ref.current
    const actualWidth = clientWidth - 48 // padding x
    setTotalWidth(Math.max(columnTotalWidth, actualWidth))
  }, [memoColumns])

  const handleClick = (data: Row<T>): void => {
    if (handleRowClick) {
      handleRowClick(data)
    }
  }
  return (
    /* eslint-disable react/jsx-key */
    <Paper
      ref={ref}
      tw="w-full p-0 relative flex-col overflow-hidden bg-transparent"
      shadow={false}
      {...restProps}
    >
      <div
        className="scroll"
        tw="h-full w-full border border-solid border-gray-1 rounded-lg"
        {...getTableProps()}
      >
        <div css={[headerFixed && tw`sticky top-0`]} style={{ minWidth: totalWidth }}>
          {headerGroups.map(headerGroup => (
            <div
              {...headerGroup.getHeaderGroupProps()}
              tw="px-6 py-4 border-b border-solid border-gray-1 bg-blue-1 flex"
            >
              {headerGroup.headers.map(column => (
                <div
                  tw="text-gray-3 text-xs font-medium flex justify-start items-center"
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()} style={{ minWidth: totalWidth, height: 'calc(100% - 49px)' }}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <div
                {...row.getRowProps()}
                tw="px-6 py-6 text-black border-b border-solid border-gray-1 cursor-pointer hover:(bg-blue-2)"
                onClick={() => handleClick(row as Row<T>)}
              >
                {row.cells.map((cell, i) => {
                  return (
                    <div
                      tw="text-xs text-black font-normal"
                      css={[
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
      </div>

      <div tw="mt-2.5 w-full">
        <span tw="float-right text-xs text-black font-normal">
          {`1頁有${pageSize}筆資料，共${Math.ceil(totalRows / pageSize)}頁`}
        </span>

        {disabledPagination ? null : (
          <div className="flex-center" tw="gap-x-2">
            {/* TODO: page calculation */}
            <Button
              className="btn-text"
              tw="text-blue-gray-3"
              label={<FontAwesomeIcon icon={faChevronLeft} />}
              disabled={!canPreviousPage}
              onClick={() => nextPage(-1)}
            />
            <Button
              className="btn-text"
              label={
                <span
                  tw="w-5 h-5 rounded inline-block leading-5 text-sm text-blue-gray-3"
                  css={[tw`bg-blue-2 text-primary`]}
                >
                  {pageIndex + 1}
                </span>
              }
            />
            {/* <Button
              className="btn-text"
              label={
                <span tw="w-5 h-5 rounded inline-block leading-5 text-sm text-blue-gray-3">
                  {pageIndex + 1}
                </span>
              }
            />
            <Button
              className="btn-text"
              label={
                <span tw="w-5 h-5 rounded inline-block leading-5 text-sm text-blue-gray-3">
                  {pageIndex + 2}
                </span>
              }
            />
            <Button
              className="btn-text"
              label={
                <span tw="w-5 h-5 rounded inline-block leading-5 text-sm text-blue-gray-3">
                  {pageIndex + 3}
                </span>
              }
            /> */}
            <Button
              className="btn-text"
              label={<FontAwesomeIcon icon={faChevronRight} />}
              disabled={!canNextPage}
              onClick={() => nextPage(1)}
            />
          </div>
        )}
      </div>
    </Paper>
  )
}

export default Table
