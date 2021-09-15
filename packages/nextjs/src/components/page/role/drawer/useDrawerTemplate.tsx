import { Dispatch, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import tw, { css } from 'twin.macro'

// components
import Button from '@/components/shared/button'
import Checkbox from '@/components/shared/checkbox'
import Collapse from '@/components/shared/collapse'
import Drawer from '@/components/shared/drawer'
import Loading from '@/components/shared/loading'
import Radio from '@/components/shared/radio'
import TextField from '@/components/shared/textField/textField'
import { InitialStateProps, Action } from '@/components/page/role/drawer/useDrawerReducer'

// core
import { Status } from '@ec-backstage/core/src/role/domain/interface/iRoleEntity'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// pages
import { Mode } from '@/pages/role'

const titleCss = css`
  ${tw`block text-base text-black font-medium`}
`

const footerShadowCss = css`
  & {
    box-shadow: 4px -4px 10px rgba(0, 0, 0, 0.2);
  }
`

const checkboxCss = css`
  & label {
    ${tw`text-base font-medium text-primary`}
    ${({ disabled }: { disabled: boolean }) => disabled && tw`text-blue-gray-3`}
  }
`

interface IUseDrawerTemplate {
  open: boolean
  close: () => void
  changeModeToEdit?: () => void
  title: string
  submit: () => Promise<void>
  mode: Mode
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
    mode,
    state,
    dispatch,
    changeModeToEdit = () => {},
    isLoading = false,
    slots = {}
  } = props
  const [errorTarget, setErrorTarget] = useState<Array<keyof InitialStateProps>>([])
  const { delete: deleteButton } = slots
  const isView = mode === Mode.view

  useEnhancedEffect(() => {
    setErrorTarget([])
  }, [open])

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

  const handleParentPermissionChange = (id: number, value: boolean): void => {
    if (errorTarget.length) {
      setErrorTarget([])
    }

    dispatch({
      type: 'updateParentPermission',
      payload: { id, value }
    })
  }

  const handleChildPermissionChange = (parentId: number, id: number, value: boolean): void => {
    if (errorTarget.length) {
      setErrorTarget([])
    }

    dispatch({
      type: 'updateChildPermission',
      payload: { id, parentId, value }
    })
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

            {isView ? (
              <Button
                tw="ml-auto"
                label="編輯"
                className="btn-outline"
                onClick={changeModeToEdit}
              />
            ) : null}
          </div>

          <div tw="flex flex-col gap-y-2 mb-5">
            <span css={[titleCss]}>角色名稱</span>
            <TextField
              placeholder="請輸入角色的名稱"
              value={state.name}
              onChange={handleNameChange}
              onClear={() => handleNameChange('')}
              error={errorTarget.includes('name')}
              disabled={isView}
              tw="text-sm"
            />
          </div>

          <div tw="flex flex-col gap-y-2 mb-5">
            <span css={[titleCss]}>權限設定</span>
            {state.permissions.map(permission => (
              <div
                key={permission.id}
                className="scroll-y"
                tw="rounded-lg bg-blue-2 p-5 flex flex-col items-start gap-y-4 max-h-72 border border-solid border-transparent"
                css={[
                  errorTarget.includes('permissions') && tw`border-red-1`,
                  isView && tw`bg-blue-1`
                ]}
              >
                <Checkbox
                  label={permission.name}
                  value={permission.value}
                  css={[checkboxCss]}
                  partialChecked={permission.children.some(child => child.value)}
                  onChange={value => handleParentPermissionChange(permission.id, value)}
                  disabled={isView}
                />
                {permission.children.map(child => (
                  <Checkbox
                    key={`${permission.id}-${child.id}`}
                    label={child.name}
                    value={child.value}
                    onChange={value => handleChildPermissionChange(child.parentId, child.id, value)}
                    disabled={isView}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <Collapse inProps={mode !== 'view'} tw="flex-shrink-0 relative z-10">
          <div tw="h-16 pl-5 pr-14 flex justify-end items-center" css={[footerShadowCss]}>
            {deleteButton || null}

            <div tw="flex items-center ml-auto">
              <Button label="取消" className="btn-outline" onClick={close} />
              <Button tw="ml-5" label="儲存" className="btn" onClick={submit} />
            </div>
          </div>
        </Collapse>
      </Drawer>
    </>
  )

  return { element, handleErrorTarget }
}

export default useDrawerTemplate
