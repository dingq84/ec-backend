/**
 * @author Dean Chen 2021-04-17
 * Header 從首頁中拉出來，主要顯示使用者訊息已經 Sidebar 的控制，
 * 屬於 Default layout 的一個 component，所以放在 layout 底下
 */

import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useMutation } from 'react-query'
import { isRight } from 'fp-ts/lib/Either'
import tw from 'twin.macro'

// components
import Button from '@/components/shared/button'
import Dialog from '@/components/shared/dialog'
import Popover from '@/components/shared/popover'
import ModifyPasswordDialog from '@/components/layout/header/modifyPasswordDialog'
import LogoutDialog from '@/components/layout/header/logoutDialog'

// core
import core from '@ec-backstage/core/src'

// states
import { useAppSelector, useAppDispatch } from '@/states/global/hooks'
import { clearMe } from '@/states/global/me'
import { setError } from '@/states/global/error'

const Header = () => {
  const anchorEl = useRef<HTMLDivElement>(null!)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const [modifyPasswordDialogOpen, setModifyPasswordDialogOpen] = useState(false)
  const [successDialogOpen, setSuccessDialogOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { user, role } = useAppSelector(state => state.me)
  const { name, account } = user
  const userName = name ? `嗨${name}，您好!` : ''
  const accountName = account || ''
  const roleName = role.length ? role[0].name : ''
  const mutation = useMutation(() => core.auth.token.logout())
  const router = useRouter()

  const togglePopover = (open: boolean): void => {
    setPopoverOpen(open)
  }

  const logout = async (): Promise<void> => {
    const result = await mutation.mutateAsync()

    if (isRight(result)) {
      router.push('/auth/login')
      dispatch(clearMe())
      return
    }

    const { errorMessage } = result.left
    dispatch(setError({ message: errorMessage }))
  }

  const openLogoutDialog = (): void => {
    setPopoverOpen(false)
    setLogoutDialogOpen(true)
  }

  const closeLogoutDialog = (): void => {
    setLogoutDialogOpen(false)
  }

  const openUpdatePasswordDialog = (): void => {
    setPopoverOpen(false)
    setModifyPasswordDialogOpen(true)
  }

  const closeModifyPasswordDialog = (): void => {
    setModifyPasswordDialogOpen(false)
  }

  const modifyPasswordSuccess = (): void => {
    closeModifyPasswordDialog()
    setSuccessDialogOpen(true)
  }

  const redirectLogin = (): void => {
    setSuccessDialogOpen(false)
    logout()
  }

  return (
    <>
      <header tw="relative bg-blue-1 flex flex-col md:flex-row">
        <nav tw="flex justify-between text-black flex-grow pr-3">
          <div>router</div>
          {userName ? (
            <div
              tw="text-gray-3 hover:(cursor-pointer)"
              data-testid="functions"
              className="flex-center"
              ref={anchorEl}
              onClick={() => togglePopover(true)}
            >
              <small tw="text-gray-3">{userName}</small>
              <small tw="text-black ml-5 mr-2.5">{roleName}</small>
              <Button
                className="btn-text"
                label={
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    tw="text-sm transition-transform duration-300 text-black"
                    css={[popoverOpen && tw`transform rotate-180`]}
                  />
                }
              />
            </div>
          ) : null}
        </nav>
        <Popover
          verticalSpace={10}
          open={popoverOpen}
          anchorEl={anchorEl.current}
          onClose={() => togglePopover(false)}
          paperProps={{ css: [tw`w-32 shadow-xl`] }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <div tw="h-12 mx-2.5" className="flex-center">
            <small tw="mx-1.5 text-gray-3">{accountName}</small>
          </div>

          <div tw="mx-auto mt-1 mb-2.5 w-11/12 bg-gray-1 height[1px]"></div>

          <ul tw="w-full all:(py-1.5 text-xs font-normal flex justify-center hover:(bg-gray-1))">
            <li onClick={openUpdatePasswordDialog}>
              <Button className="btn-text" label="重設密碼" tw="text-black" />
            </li>
            <li onClick={openLogoutDialog} tw="cursor-pointer">
              <Button className="btn-text" label="登出" tw="text-black" />
            </li>
          </ul>
        </Popover>
      </header>

      <LogoutDialog open={logoutDialogOpen} close={closeLogoutDialog} logout={logout} />

      {modifyPasswordDialogOpen ? (
        <ModifyPasswordDialog
          open={modifyPasswordDialogOpen}
          close={closeModifyPasswordDialog}
          success={modifyPasswordSuccess}
        />
      ) : null}

      {successDialogOpen ? (
        <Dialog
          open={successDialogOpen}
          content={
            <div tw="py-5 w-full">
              <h1 tw="font-medium text-black text-2xl mb-8 text-center">系統提醒</h1>
              <p tw="text-lg font-normal text-black text-center mb-10 whitespace-pre">
                已重設您的密碼，現在請您重新登入帳號
              </p>
            </div>
          }
          close={redirectLogin}
        />
      ) : null}
    </>
  )
}

export default Header
