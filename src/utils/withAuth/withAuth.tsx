import { useSession } from 'next-auth/client'
import React from 'react'

function withAuth<T extends {}>(
  Component: React.ComponentType<T>, // Protected Component
  AccessDeniedComponent: React.ComponentType<{}> = () => <h1>denied</h1> // Access denied Component
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
