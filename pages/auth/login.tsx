import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import 'twin.macro'

// components
import Button from '@/components/shared/button'
import Paper from '@/components/shared/paper'
import TextField from '@/components/shared/textField'

// layouts
import LoginLayout from '@/layouts/login'

type SignInForm = {
  account: string
  password: string
}

const schema = yup.object().shape({
  account: yup.string().required('Please enter your account'),
  password: yup.string().required('Please enter your password')
})

function Login() {
  const router = useRouter()
  const { register, handleSubmit, errors, clearErrors, setValue } = useForm<SignInForm>({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    clearErrors()
  }, [])

  const onSubmit = (data: SignInForm): void => {
    console.log(data)
    router.push('/')
  }

  return (
    <LoginLayout>
      <Paper tw="bg-white-1 px-9 py-7">
        <div tw="w-full sm:(w-72)">
          <h1 tw="text-black text-center text-4xl relative font-normal after:(content inline-block absolute w-1/4 border-t-2 border-gray-400 -bottom-4 left-1/2 transform[translateX(-50%)])">
            後台管理
          </h1>
          <form tw="mt-12 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              inputRef={register}
              id="account"
              name="account"
              label="Account"
              error={Boolean(errors.account?.message)}
              errorMessage={errors.account?.message}
              onClear={() => setValue('account', '')}
              tw="mb-4"
            />
            <TextField
              inputRef={register}
              id="password"
              name="password"
              type="password"
              label="Password"
              error={Boolean(errors.password?.message)}
              errorMessage={errors.password?.message}
              onClear={() => setValue('password', '')}
            />
            <Button label="Sign In" className="btn mt-8 mx-auto" type="submit" />
          </form>
        </div>
      </Paper>
    </LoginLayout>
  )
}

export default Login
