import { render } from '@testing-library/react'
import client from 'next-auth/client'
import '@testing-library/jest-dom'

// utils
import withAuth from '.'

jest.mock('next-auth/client')

describe('test withAuth', () => {
  function AccessDenied() {
    return <div>Access denied</div>
  }
  const User = withAuth(function User() {
    return <div>User here</div>
  }, AccessDenied)

  it('should go into the page', () => {
    const mockSession = {
      expires: '1',
      user: { email: 'a', name: 'Delta', image: 'c' }
    }

    ;(client.useSession as jest.Mock).mockReturnValueOnce([mockSession, false])

    const { getByText } = render(<User />)

    expect(getByText('User here')).toBeInTheDocument()
  })

  it('should go into the access deny', () => {
    ;(client.useSession as jest.Mock).mockReturnValueOnce([null, false])
    const { getByText } = render(<User />)
    expect(getByText('Access denied')).toBeInTheDocument()
  })
})
