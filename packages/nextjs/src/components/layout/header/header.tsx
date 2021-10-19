import { useState, useRef } from 'react'
import { useQueryClient } from 'react-query'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import tw from 'twin.macro'

// components
import Button from '@/components/shared/button'
import Dialog from '@/components/shared/dialog'
import Popover from '@/components/shared/popover'
import ModifyPasswordDialog from '@/components/layout/header/modifyPasswordDialog'
import LogoutDialog from '@/components/layout/header/logoutDialog'

// constants
import { ApiKey } from '@/constants/services/api'

// core
import core from '@ec-backstage/core/src'

// services
import useNormalMutation from '@/services/useNormalMutation'

// states
import { useAppSelector, useAppDispatch } from '@/states/hooks'
import { clearMe } from '@/states/me'

const Header = () => {
  const anchorEl = useRef<HTMLDivElement>(null!)
  const queryClient = useQueryClient()
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const [modifyPasswordDialogOpen, setModifyPasswordDialogOpen] = useState(false)
  const [successDialogOpen, setSuccessDialogOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { user, role } = useAppSelector(state => state.me)
  const { mutate } = useNormalMutation(() => core.auth.logout(), {
    onSuccess() {
      dispatch(clearMe())
      queryClient.removeQueries(ApiKey.isLogged)
      queryClient.removeQueries(ApiKey.me)
      router.push('/auth/login')
    }
  })
  const router = useRouter()
  const { name, account } = user
  const userName = name ? `嗨${name}，您好!` : ''
  const accountName = account || ''
  const roleName = role.length ? role[0].name : ''

  const togglePopover = (open: boolean): void => {
    setPopoverOpen(open)
  }

  const logout = (): void => {
    mutate()
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
        <nav tw="flex justify-end text-black flex-grow pr-3">
          {/* <div>router</div> */}
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
          paperProps={{ css: [tw`shadow-xl py-2.5`] }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <div tw="h-12 mx-2.5 flex items-center">
            <div tw="w-8 h-8 rounded-full bg-blue-2"></div>
            <div tw="ml-2 flex flex-col">
              <span tw="text-gray-3 text-base">{name}</span>
              <small tw="text-gray-2">{accountName}</small>
            </div>
          </div>

          <div tw="mx-auto mt-1 mb-2.5 w-11/12 bg-gray-1 height[1px]"></div>

          <ul tw="w-full all:(font-normal text-black flex items-center)">
            <li>
              <Button
                label={
                  <>
                    <Image
                      src="/icons/portfolio.svg"
                      alt="logout icon"
                      width={15}
                      height={15}
                      tw="color[inherit]"
                    />
                    <span tw="inline-block ml-5 color[inherit] text-sm">個人資料</span>
                  </>
                }
                tw="w-full py-3.5 px-5 justify-start hover:(bg-blue-2 text-primary)"
              />
            </li>
            <li>
              <Button
                onClick={openUpdatePasswordDialog}
                label={
                  <>
                    <Image
                      src="/icons/refresh.svg"
                      alt="logout icon"
                      width={15}
                      height={15}
                      tw="color[inherit]"
                    />
                    <span tw="inline-block ml-5 color[inherit] text-sm">重設密碼</span>
                  </>
                }
                tw="w-full py-3.5 px-5 justify-start hover:(bg-blue-2 text-primary)"
              />
            </li>
            <li tw="mx-auto mt-1 mb-1 w-11/12 bg-gray-1 height[1px]"></li>
            <li onClick={openLogoutDialog}>
              <Button
                label={
                  <>
                    <Image
                      src="/icons/logout.svg"
                      alt="logout icon"
                      width={15}
                      height={15}
                      tw="color[inherit]"
                    />
                    <span tw="inline-block ml-5 color[inherit] text-sm">登出</span>
                  </>
                }
                tw="w-full py-3.5 px-5 justify-start hover:(bg-blue-2 text-primary)"
              />
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
