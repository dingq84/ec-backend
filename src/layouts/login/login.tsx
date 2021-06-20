import 'twin.macro'

type LoginLayoutProps = {
  children: React.ReactNode
}

function LoginLayout(props: LoginLayoutProps) {
  const { children } = props

  return <div tw="bg-white-2 w-screen h-screen flex justify-center items-center">{children}</div>
}

export default LoginLayout
