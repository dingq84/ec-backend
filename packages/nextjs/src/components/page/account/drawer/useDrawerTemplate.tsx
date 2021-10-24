import { Dispatch, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import tw, { css } from 'twin.macro'

// components
import Button from '@/components/shared/button'
import Fade from '@/components/shared/fade'
import Drawer from '@/components/shared/drawer'
import Loading from '@/components/shared/loading'
import Radio from '@/components/shared/radio'
import Select from '@/components/shared/select'
import TextField from '@/components/shared/textField/textField'
import { InitialStateProps, Action } from '@/components/page/account/drawer/useDrawerReducer'

// constants
import { OperationMode } from '@/constants/common'

// core
import { Status } from '@ec-backstage/core/src/common/constants/status'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

const titleCss = css`
  ${tw`block text-base text-black font-medium`}
`

const footerShadowCss = css`
  & {
    box-shadow: 4px -4px 10px rgba(0, 0, 0, 0.2);
  }
`

interface IUseDrawerTemplate {
  open: boolean
  close: () => void
  changeModeToEdit?: () => void
  title: string
  submit: () => void
  submitLabel: string
  mode: OperationMode
  state: InitialStateProps
  dispatch: Dispatch<Action>
  isLoading?: boolean
  slots?: {
    delete?: JSX.Element | undefined
  }
}

const useDrawerTemplate = (props: IUseDrawerTemplate) => {
  const {
    open,
    close,
    title,
    submit,
    submitLabel,
    mode,
    state,
    dispatch,
    changeModeToEdit = () => {},
    isLoading = false,
    slots = {}
  } = props
  const [errorTarget, setErrorTarget] = useState<Array<keyof InitialStateProps>>([])
  const [inputType, setInputType] = useState<'text' | 'password'>('password')
  const isView = mode === OperationMode.view

  useEnhancedEffect(() => {
    setErrorTarget([])
  }, [open])

  const handleInputTypeChange = (): void => {
    setInputType(inputType === 'text' ? 'password' : 'text')
  }

  const handleErrorTarget = (data: typeof errorTarget): void => {
    setErrorTarget(data)
  }

  const handleStatusChange = (status: string): void => {
    if (errorTarget.length) {
      setErrorTarget([])
    }
    dispatch({ type: 'updateStatus', payload: { status: Number(status) } })
  }

  const handleNameChange = (name: string): void => {
    if (errorTarget.length) {
      setErrorTarget([])
    }
    dispatch({ type: 'updateName', payload: { name } })
  }

  const handleAccountChange = (account: string): void => {
    if (errorTarget.length) {
      setErrorTarget([])
    }
    dispatch({ type: 'updateAccount', payload: { account } })
  }

  const handlePasswordChange = (password: string): void => {
    if (errorTarget.length) {
      setErrorTarget([])
    }
    dispatch({ type: 'updatePassword', payload: { password } })
  }

  const handleRoleIdChange = (roleId: string): void => {
    if (errorTarget.length) {
      setErrorTarget([])
    }
    dispatch({ type: 'updateRoleId', payload: { roleId } })
  }

  const element = (
    <>
      <Loading isLoading={isLoading} />

      <Drawer
        open={open}
        position="right"
        paperProps={{ css: [tw`width[570px] flex flex-col`] }}
        onBackdropClick={close}
      >
        <div tw="flex-shrink-0 h-16 p-5 bg-primary flex justify-between items-center">
          <span tw="text-lg text-white font-semibold">{`${title}角色`}</span>
          <FontAwesomeIcon icon={faTimes} tw="text-xs text-white cursor-pointer" onClick={close} />
        </div>

        <div tw="flex-grow py-5 pl-5 pr-7" className="scroll-y">
          <div tw="flex items-center justify-start gap-x-4 mb-5">
            <span css={[titleCss]}>啟用狀態</span>
            <Radio<Status>
              label="啟用"
              checked={state.status === Status.active}
              value={Status.active}
              onChange={handleStatusChange}
              disabled={isView}
            />
            <Radio<Status>
              label="停用"
              checked={state.status === Status.inactive}
              value={Status.inactive}
              onChange={handleStatusChange}
              disabled={isView}
            />
          </div>

          <div tw="flex flex-col gap-y-2 mb-5">
            <span css={[titleCss]}>管理者名稱</span>
            <TextField
              placeholder="請輸入管理者名稱"
              value={state.name}
              onChange={handleNameChange}
              onClear={() => handleNameChange('')}
              error={errorTarget.includes('name')}
              disabled={isView}
              tw="text-sm"
            />
          </div>

          <div tw="flex flex-col gap-y-2 mb-5">
            <span css={[titleCss]}>管理者帳號</span>
            <TextField
              placeholder="請輸入管理者帳號"
              value={state.account}
              onChange={handleAccountChange}
              onClear={() => handleAccountChange('')}
              error={errorTarget.includes('account')}
              disabled={isView}
              tw="text-sm"
            />
          </div>

          {mode === OperationMode.create ? (
            <div tw="flex flex-col gap-y-2 mb-5">
              <span css={[titleCss]}>管理者密碼</span>
              <TextField
                placeholder="請輸入管理者密碼"
                value={state.password}
                onChange={handlePasswordChange}
                onClear={() => handlePasswordChange('')}
                error={errorTarget.includes('password')}
                disabled={isView}
                tw="text-sm"
                type={inputType}
                adornment={{
                  end: (
                    <FontAwesomeIcon
                      tw="cursor-pointer text-gray-3"
                      icon={inputType === 'text' ? faEyeSlash : faEye}
                      onClick={handleInputTypeChange}
                    />
                  )
                }}
              />
            </div>
          ) : null}

          <div tw="flex flex-col gap-y-2 mb-5">
            <span css={[titleCss]}>管理者角色</span>
            <Select
              placeholder="請選擇角色"
              value={state.roleId}
              onChange={handleRoleIdChange}
              inputProps={{
                error: errorTarget.includes('roleId')
              }}
              options={state.roleList}
              disabled={isView}
              tw="text-sm"
            />
          </div>
        </div>

        <div tw="flex-shrink-0 relative z-10 h-16 pl-5 pr-14" css={[footerShadowCss]}>
          {isView ? (
            <Button
              tw="ml-auto mt-3"
              label="編輯"
              className="btn-outline"
              onClick={changeModeToEdit}
            />
          ) : (
            <Fade inProps={isView === false}>
              <div tw="flex justify-end items-center w-full h-full">
                {slots.delete || null}

                <div tw="flex items-center ml-auto">
                  <Button label="取消" className="btn-outline" onClick={close} />
                  <Button tw="ml-5" label={submitLabel} className="btn" onClick={submit} />
                </div>
              </div>
            </Fade>
          )}
        </div>
      </Drawer>
    </>
  )

  return { element, handleErrorTarget }
}

export default useDrawerTemplate
