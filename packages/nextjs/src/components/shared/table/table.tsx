import { useMemo, useState, useRef, forwardRef, HTMLAttributes } from 'react'
import { useTable, useFlexLayout, useResizeColumns, usePagination } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import tw from 'twin.macro'

// components
import Button from '@/components/shared/button'
import DeleteButton from '@/components/shared/table/deleteButton'
import EditButton from '@/components/shared/table/editButton'
import Paper from '@/components/shared/paper'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'
import useForkRef from '@/hooks/useForkRef'

// types
import { CustomColumn, FunctionTypes } from '@/types/components/table'

interface TableProps extends HTMLAttributes<HTMLDivElement> {
  columns: CustomColumn[]
  data: {}[]
  headerFixed?: boolean
  disabledPagination?: boolean
  handleFunctions?: Record<FunctionTypes, (row: unknown) => void>
  pagination: {
    currentPage?: number // 目前第幾頁 (要)
    totalRows: number // 總共幾筆
    fetchData: Function // 換頁 call api
    pageSize?: number
  }
}

const getColumnsSlot = (slotName: FunctionTypes) => {
  switch (slotName) {
    case FunctionTypes.edit:
      return EditButton
    case FunctionTypes.delete:
      return DeleteButton
    default:
      return DeleteButton
  }
}

const Table = forwardRef<HTMLDivElement, TableProps>(function Table(props, ref) {
  const {
    columns,
    data,
    headerFixed = true,
    handleFunctions,
    pagination,
    disabledPagination = false,
    ...restProps
  } = props
  const { totalRows, currentPage = 0, pageSize = 10 } = pagination
  const [totalWidth, setTotalWidth] = useState(1000)
  const nodeRef = useRef<HTMLDivElement>(null!)
  const handleRef = useForkRef(ref, nodeRef)
  const memoHandleFunctions = useMemo(() => handleFunctions, [handleFunctions])
  // 官方建議將 column 和 data 做 useMemo
  const memoColumns = useMemo(
    () =>
      columns.map(column => {
        if (column.headerSlot) {
          const Component = getColumnsSlot(column.headerSlot)
          column.Header = (row: unknown) => (
            <Component onClick={() => memoHandleFunctions![column.headerSlot!](row)} />
          )
        } else if (column.cellSlot) {
          const Component = getColumnsSlot(column.cellSlot)
          column.Cell = (row: unknown) => (
            <Component onClick={() => memoHandleFunctions![column.cellSlot!](row)} />
          )
        }

        return column
      }),
    [columns, memoHandleFunctions]
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
      initialState: { pageIndex: currentPage, pageSize },
      manualPagination: true,
      pageCount: totalRows
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
    const { clientWidth } = nodeRef.current
    const actualWidth = clientWidth - 48 // padding x
    setTotalWidth(Math.max(columnTotalWidth, actualWidth))
  }, [memoColumns])

  return (
    /* eslint-disable react/jsx-key */
    <Paper
      ref={handleRef}
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
            />
            <Button
              className="btn-text"
              label={
                <span tw="w-5 h-5 rounded inline-block leading-5 text-sm text-blue-gray-3">
                  {pageIndex + 4}
                </span>
              }
            />
            <Button
              className="btn-text"
              label={<FontAwesomeIcon icon={faChevronRight} />}
              disabled={!canNextPage}
            />
          </div>
        )}
      </div>
    </Paper>
  )
})

export default Table
