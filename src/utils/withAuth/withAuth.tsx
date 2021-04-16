import { useSession, signIn } from 'next-auth/client'
import 'twin.macro'

// components
import Modal from '@/components/modal'
import Paper from '@/components/paper'
import Button from '@/components/button'

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
      return <div>loading</div>
    }

    if (!session) {
      return <AccessDeniedComponent />
    }

    return <Component {...props} />
  }
}

export default withAuth
