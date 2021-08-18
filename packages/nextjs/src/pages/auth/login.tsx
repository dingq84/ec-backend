import { useState, useRef, Ref } from 'react'
import { isRight } from 'fp-ts/Either'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import 'twin.macro'

// components
import Button from '@/components/shared/button'
import Paper from '@/components/shared/paper'
import TextField from '@/components/shared/textField'
import Toast from '@/components/shared/toast'

// core
import core from '@ec-backend/core/src'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'
import useForkRef from '@/hooks/useForkRef'

// layouts
import LoginLayout from '@/layouts/login'
import { StatusCode } from '@/common/constants/statusCode'

interface loginData {
  account: string
  password: string
}

function Login() {
  const router = useRouter()
  const [inputType, setInputType] = useState<'text' | 'password'>('password')
  const { register, handleSubmit, errors, clearErrors, setValue, setError } = useForm<loginData>({
    reValidateMode: 'onSubmit'
  })
  const accountRef = useRef<HTMLInputElement>(null!)
  const handleRef = useForkRef(accountRef, register) as Ref<HTMLInputElement>
  const errorMessage = errors?.account?.message || errors?.password?.message || ''

  useEnhancedEffect(() => {
    clearErrors()
  }, [])

  const handleInputTypeChange = (): void => {
    if (inputType === 'text') {
      setInputType('password')
    } else {
      setInputType('text')
    }
  }

  const onSubmit = async (data: loginData): Promise<void> => {
    const result = await core.auth.token.login(data)
    if (isRight(result)) {
      router.push('/')
      return
    }

    const { errorMessage, statusCode } = result.left
    const customError = {
      type: 'manual',
      message: errorMessage
    }
    // 清除密碼
    setValue('password', '')
    // 反白帳號
    accountRef.current.focus()
    accountRef.current.select()

    setError('account', customError)
    if (statusCode !== StatusCode.wrongAccountFormat) {
      setError('password', customError)
    }

    // 帳號被凍結走全局錯誤處理
    if (statusCode === StatusCode.accountFrozen) {
      return
    }
  }

  return (
    <LoginLayout>
      <Toast
        show={Boolean(errorMessage)}
        message={errorMessage}
        level="warning"
        position="leftBottom"
      />
      <Paper tw="bg-white height[calc(100% - 64px)] px-12 width[450px] flex-col">
        <h1 tw="w-full text-black text-4xl font-semibold leading-normal mb-4">後台管理系統</h1>
        <p tw="text-lg text-gray-3 font-normal w-full">請登入您的使用者帳號及密碼</p>
        <form tw="w-full mt-12 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            inputRef={handleRef}
            id="account"
            name="account"
            label="帳號"
            placeholder="請輸入您的帳號"
            error={Boolean(errors.account?.message)}
            onChange={() => clearErrors()}
            onClear={() => setValue('account', '')}
            tabIndex={1}
            tw="mb-4 w-full"
          />
          <TextField
            inputRef={register}
            id="password"
            name="password"
            type={inputType}
            label="密碼"
            tabIndex={2}
            placeholder="請輸入您的密碼"
            error={Boolean(errors.password?.message)}
            onClear={() => setValue('password', '')}
            onChange={() => clearErrors()}
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
          <Button
            label="登入"
            tabIndex={3}
            className="btn"
            tw="mt-15 w-full font-medium text-lg"
            type="submit"
          />
        </form>
      </Paper>
    </LoginLayout>
  )
}

export default Login
