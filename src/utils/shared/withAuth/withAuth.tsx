/**
 * @author Dean Chen 2021-04-17
 * withAuth 這支主要負責處理權限的判斷，透過 next-auth 的 utils，判斷 session，並回傳對應的 Component
 *
 * @modified
 * [Dean Chen 2021-06-05]: 因為專案為 SSG，因此移除 next-auth，改用 client side 判斷
 */

import 'twin.macro'
import Link from 'next/link'

// components
import Modal from '@/components/shared/modal'
import Paper from '@/components/shared/paper'
import Button from '@/components/shared/button'
import Loading from '@/components/shared/loading'

// services
import isLogged from '@/services/auth/isLogged'

const DefaultAccessDeniedComponent = () => (
  <Modal open>
    <Paper tw="flex flex-col w-80">
      <h1 tw="text-2xl mb-6">Please Log in</h1>
      <Link href="/auth/login" passHref>
        <Button label="Sign in" className="btn" />
      </Link>
    </Paper>
  </Modal>
)

function withAuth<T extends {}>(
  Component: React.ComponentType<T>, // Protected Component
  AccessDeniedComponent: React.ComponentType<{}> = DefaultAccessDeniedComponent // Access denied Component
) {
  return function WrapperComponent(props: T) {
    const { isLoading, isError } = isLogged()

    if (isLoading) {
      return <Loading isLoading />
    }

    if (isError) {
      return <AccessDeniedComponent />
    }

    return <Component {...props} />
  }
}

export default withAuth
