import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { getProviders, signIn } from 'next-auth/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGooglePlusG, faGithubAlt } from '@fortawesome/free-brands-svg-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import 'twin.macro'

// components
import Paper from '@/components/paper'
import Input from '@/components/input'
import Button from '@/components/button'

type SignInProps = {
  providers: any
}

type SignInForm = {
  account: string
  password: string
}

const schema = yup.object().shape({
  account: yup.string().required('Please enter your account'),
  password: yup.string().required('Please enter your password')
})

function SignIn({ providers }: SignInProps) {
  const router = useRouter()
  const { register, handleSubmit, errors, setValue } = useForm<SignInForm>({
    resolver: yupResolver(schema)
  })
  // 使用客製化登入頁面的 provider 會有導向問題，目前解法參考下方 issue
  // https://github.com/nextauthjs/next-auth/issues/591#issuecomment-715992773
  const callbackUrl = router.query.callbackUrl as string

  const onSubmit = (data: SignInForm) => {
    login(providers.credentials.id, data)
  }

  const login = (providerId: string, data = {}): void => {
    signIn(providerId, { callbackUrl, ...data })
  }

  return (
    <div tw="bg-primary w-screen h-screen flex justify-center items-center">
      <Paper>
        <div tw="w-full sm:(w-72)">
          <h1 tw="text-dark-gray-1 text-center text-4xl relative after:(content inline-block absolute w-1/4 border-t-2 border-gray-400 -bottom-4 left-1/2 transform[translateX(-50%)])">
            Sign in to Account
          </h1>
          <div tw="mt-10 mb-4 flex justify-around px-4">
            <Button label={<FontAwesomeIcon icon={faFacebookF} />} shape="circle" />
            <Button
              label={<FontAwesomeIcon icon={faGooglePlusG} />}
              shape="circle"
              click={() => login(providers.google.id)}
            />
            <Button
              label={<FontAwesomeIcon icon={faGithubAlt} />}
              shape="circle"
              click={() => login(providers.github.id)}
            />
          </div>
          <span tw="block text-center text-gray-300">or use your email account</span>
          <form tw="mt-8 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="account"
              isFull
              className="mb-7"
              label="Account"
              name="account"
              ref={register}
              clear={() => setValue('account', '')}
              error={errors.account?.message}
            />
            <Input
              id="password"
              isFull
              label="Password"
              name="password"
              ref={register}
              clear={() => setValue('password', '')}
              error={errors.password?.message}
            />
            <Button label="Sign In" className="mt-8 mx-auto" type="submit" />
          </form>
        </div>
      </Paper>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers }
  }
}

export default SignIn
