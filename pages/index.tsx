import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons'
import 'twin.macro'

// components
import Button from '@/components/shared/button'
import Paper from '@/components/shared/paper'
import Table from '@/components/shared/table'
import TextField from '@/components/shared/textField'

// mocks
import accountData from '@/mocks/accountData.json'

// layouts
import DefaultLayout from '@/layouts/default'

// utils
import withAuth from '@/utils/shared/withAuth'

const Home = () => {
  return (
    <DefaultLayout>
      <div tw="py-6 px-4 flex flex-col space-y-5 h-full overflow-auto">
        <Paper tw="w-full py-4 justify-between">
          <TextField
            placeholder="搜尋帳號、姓名..."
            adornment={{
              start: <FontAwesomeIcon icon={faSearch} />
            }}
          />
          <div className="flex-center" tw="space-x-3">
            <Button className="btn-outline" label="匯出" />
            <Button
              className="btn"
              label={
                <>
                  <FontAwesomeIcon icon={faFilter} />
                  <span>篩選條件</span>
                </>
              }
            />
          </div>
        </Paper>
        <Table
          columns={accountData.columns}
          data={accountData.data}
          pagination={{
            currentPage: 0,
            totalRows: accountData.data.length,
            fetchData: () => {}
          }}
        />
      </div>
    </DefaultLayout>
  )
}

export default withAuth(Home)
