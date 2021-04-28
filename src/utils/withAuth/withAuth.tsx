/**
 * @author Dean Chen 2021-04-117
 * withAuth 這支主要負責處理權限的判斷，透過 next-auth 的 utils，判斷 session，並回傳對應的 Component
 */

import { useSession, signIn } from 'next-auth/client'
import 'twin.macro'

// components
import Modal from '@/components/common/modal'
import Paper from '@/components/common/paper'
import Button from '@/components/common/button'
import Loading from '@/components/common/loading'

const DefaultAccessDeniedComponent = () => (
  <Modal open>
    <Paper tw="flex flex-col w-80">
      <h1 tw="text-2xl mb-6">Please Log in</h1>
      <Button label="Sign in" onClick={() => signIn()} />
    </Paper>
  </Modal>
)

function withAuth<T extends {}>(
  Component: React.ComponentType<T>, // Protected Component
  AccessDeniedComponent: React.ComponentType<{}> = DefaultAccessDeniedComponent // Access denied Component
) {
  return function WrapperComponent(props: T) {
    const [session, loading] = useSession()

    if (loading) {
      return <Loading isLoading />
    }

    if (!session) {
      return <AccessDeniedComponent />
    }

    return <Component {...props} />
  }
}

export default withAuth
