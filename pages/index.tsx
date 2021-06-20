import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
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
      <div tw="py-6 px-4 flex flex-col space-y-5 h-full">
        <Paper tw="w-full py-4 justify-between">
          <TextField
            id="account-search"
            placeholder="搜尋帳號、姓名..."
            startAdornment={<FontAwesomeIcon icon={faSearch} tw="text-black" />}
          />
          <Button
            className="btn"
            label={
              <>
                <FontAwesomeIcon icon={faSearch} />
                <span>搜尋</span>
              </>
            }
          />
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
