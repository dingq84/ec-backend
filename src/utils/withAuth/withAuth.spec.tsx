import { render } from '@testing-library/react'
import client from 'next-auth/client'
import '@testing-library/jest-dom'

// utils
import withAuth from '.'

jest.mock('next-auth/client')

describe('test withAuth', () => {
  const User = withAuth(function User() {
    return <div>User here</div>
  })

  it('should go into the loading', () => {
    ;(client.useSession as jest.Mock).mockReturnValueOnce([null, true])
    render(<User />)
    expect(document.body.querySelector('[class*="loading"]')).toBeTruthy()
  })

  it('should go into the page', () => {
    const mockSession = {
      expires: '1',
      user: { email: 'a', name: 'Delta', image: 'c' }
    }

    ;(client.useSession as jest.Mock).mockReturnValueOnce([mockSession, false])

    const { getByText } = render(<User />)

    expect(getByText('User here')).toBeInTheDocument()
  })

  it('should go into the default access deny page', () => {
    jest.useFakeTimers()
    ;(client.useSession as jest.Mock).mockReturnValueOnce([null, false])
    const { getByText } = render(<User />)
    jest.runAllTimers()
    expect(getByText('Please Log in')).toBeInTheDocument()
  })

  it('should go into the custom access deny page', () => {
    function AccessDenied() {
      return <div>Access denied</div>
    }
    const User = withAuth(function User() {
      return <div>User here</div>
    }, AccessDenied)
    ;(client.useSession as jest.Mock).mockReturnValueOnce([null, false])
    const { getByText } = render(<User />)
    expect(getByText('Access denied')).toBeInTheDocument()
  })
})
