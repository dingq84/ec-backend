import { isLeft, isRight } from 'fp-ts/lib/Either'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import tw, { css } from 'twin.macro'

// components
import Button from '@/components/shared/button'
import Checkbox from '@/components/shared/checkbox'
import Collapse from '@/components/shared/collapse'
import Drawer from '@/components/shared/drawer'
import Radio from '@/components/shared/radio'
import TextField from '@/components/shared/textField/textField'
import { ToastProps } from '@/components/shared/toast'
import useDrawerReducer from '@/components/page/role/drawer/useDrawerReducer'
import drawerConfig from '@/components/page/role/drawer/config'

// core
import core from '@ec-backstage/core/src'
import { ICreateRoleInputPort } from '@ec-backstage/core/src/role/application/interface/iCreateRoleUseCase'
import { Status } from '@ec-backstage/core/src/role/domain/interface/iRoleEntity'
import { StatusCode } from '@ec-backstage/core/src/common/constants/statusCode'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// pages
import { Mode } from '@/pages/role'
import { useMutation, useQuery } from 'react-query'
import { ApiKey } from '@/constants/services/api'

// state
import { useAppDispatch } from '@/states/global/hooks'
import { setError } from '@/states/global/error'
import { useState } from 'react'

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
  }
`

interface RoleDrawerProps {
  mode: Mode
  open: boolean
  close(): void
  handleToast(toastProps: Pick<ToastProps, 'show' | 'level' | 'message'>): void
}

const RoleDrawer = (props: RoleDrawerProps) => {
  const { open, close, mode, handleToast } = props
  const reduxDispatch = useAppDispatch()
  const [errorTarget, setErrorTarget] = useState<Array<keyof ICreateRoleInputPort>>([])
  const [state, dispatch] = useDrawerReducer()
  const { data } = useQuery(ApiKey.permissionList, () => core.permission.getPermissionList(), {
    enabled: open,
    refetchOnWindowFocus: false,
    staleTime: 600000
  })
  const createMutation = useMutation((data: ICreateRoleInputPort) => core.role.createRole(data))

  useEnhancedEffect(() => {
    if (open) {
      dispatch({ type: 'reset' })
    }
  }, [open])

  useEnhancedEffect(() => {
    if (data) {
      if (isLeft(data)) {
        const { errorMessage } = data.left
        reduxDispatch(setError({ message: errorMessage }))
      } else {
        dispatch({ type: 'setPermissionData', payload: { permissions: data.right } })
      }
    }
  }, [data])

  const submit = async (): Promise<void> => {
    const mutation = mode === 'create' ? createMutation : createMutation
    const result = await mutation.mutateAsync(state)

    if (isRight(result)) {
      handleToast({ show: true, level: 'success', message: `「${state.name}」角色編輯成功` })
      close()
      return
    }

    const { statusCode, statusMessage } = result.left

    if (
      [
        StatusCode.wrongRoleNameFormat,
        StatusCode.permissionIsEmpty,
        StatusCode.roleNameIsExist
      ].includes(statusCode)
    ) {
      handleToast({ show: true, level: 'warning', message: statusMessage })

      if (statusCode === StatusCode.permissionIsEmpty) {
        setErrorTarget(['permissions'])
      } else {
        setErrorTarget(['name'])
      }

      return
    }

    reduxDispatch(setError({ message: statusMessage }))
  }

  return (
    <Drawer
      open={open}
      position="right"
      paperProps={{ css: [tw`width[570px] flex flex-col`] }}
      onBackdropClick={close}
    >
      <div tw="flex-shrink-0 h-16 p-5 bg-primary flex justify-between items-center">
        <span tw="text-lg text-white font-semibold">{`${drawerConfig[mode].title}角色`}</span>
        <FontAwesomeIcon icon={faTimes} tw="text-xs text-white" />
      </div>
      <div tw="flex-grow py-5 pl-5 pr-7" className="scroll-y">
        <div tw="flex items-center justify-start gap-x-4 mb-5">
          <span css={[titleCss]}>啟用狀態</span>
          <Radio<Status>
            label="啟用"
            checked={state.status === Status.active}
            value={Status.active}
            onChange={status => {
              dispatch({ type: 'updateStatus', payload: { status: Number(status) } })
            }}
          />
          <Radio<Status>
            label="停用"
            checked={state.status === Status.inactive}
            value={Status.inactive}
            onChange={status => {
              dispatch({ type: 'updateStatus', payload: { status: Number(status) } })
            }}
          />
        </div>

        <div tw="flex flex-col gap-y-2 mb-5">
          <span css={[titleCss]}>{`${drawerConfig[mode].subtitle}角色名稱`}</span>
          <TextField
            placeholder="請輸入角色的名稱"
            value={state.name}
            onChange={name => dispatch({ type: 'updateName', payload: { name } })}
            onClear={() => dispatch({ type: 'updateName', payload: { name: '' } })}
            error={errorTarget.includes('name')}
          />
        </div>

        <div tw="flex flex-col gap-y-2 mb-5">
          <span css={[titleCss]}>權限設定</span>
          {state.permissions.map(permission => (
            <div
              key={permission.id}
              className="scroll-y"
              tw="rounded-lg bg-blue-2 p-5 flex flex-col items-start gap-y-4 max-h-72"
              css={[errorTarget.includes('permissions') && tw`border border-solid border-red-1`]}
            >
              <Checkbox
                label={permission.name}
                value={permission.value}
                css={[checkboxCss]}
                partialChecked={permission.children.some(child => child.value)}
                onChange={value =>
                  dispatch({
                    type: 'updateParentPermission',
                    payload: { id: permission.id, value }
                  })
                }
              />
              {permission.children.map(child => (
                <Checkbox
                  key={`${permission.id}-${child.id}`}
                  label={child.name}
                  value={child.value}
                  onChange={value =>
                    dispatch({
                      type: 'updateChildPermission',
                      payload: { id: child.id, parentId: child.parentId, value }
                    })
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <Collapse inProps={mode !== 'view'} tw="flex-shrink-0">
        <div tw="h-16 pl-5 pr-14 flex justify-end items-center" css={[footerShadowCss]}>
          {mode === 'edit' ? (
            <Button
              label="刪除"
              className="btn-outline"
              tw="text-red-3 border-red-3 hover:(text-white bg-red-3)"
            />
          ) : null}

          <div tw="flex items-center ml-auto">
            <Button label="取消" className="btn-outline" onClick={close} />
            <Button tw="ml-5" label="儲存" className="btn" onClick={submit} />
          </div>
        </div>
      </Collapse>
    </Drawer>
  )
}

export default RoleDrawer
