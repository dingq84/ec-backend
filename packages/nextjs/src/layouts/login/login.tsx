import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { css } from 'twin.macro'

// components
import Fade from '@/components/shared/fade'
import Loading from '@/components/shared/loading'

// constants
import { ApiKey } from '@/constants/services/api'

// core
import core from '@ec-backstage/core/src'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// services
import useNoCacheQuery from '@/services/useNoCacheQuery'

type LoginLayoutProps = {
  children: React.ReactNode
}

const gradient = css`
  & {
    background: linear-gradient(183.74deg, #191b2c -30.18%, #161054 59.34%, #393091 110.71%);
  }
`

function LoginLayout(props: LoginLayoutProps) {
  const router = useRouter()
  const { data, isLoading } = useNoCacheQuery(ApiKey.isLogged, () => core.auth.checkIsLogged())
  const { children } = props

  useEnhancedEffect(() => {
    if (data) {
      router.push('/')
    }
  }, [data])

  if (isLoading || data === true) {
    return <Loading isLoading />
  }

  return (
    <Fade inProps>
      <div css={[gradient]} tw="min-width[1366px]  h-screen flex flex-col">
        <Head>
          <title>E-commerce backstage</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <header tw="py-5 mx-5 flex-shrink-0">
          <span tw="inline-flex items-center">
            <Image src="/images/logo.svg" alt="logo" width={24} height={20} />
            <Image
              src="/images/logoWord.svg"
              alt="vivy admin website"
              tw="pl-2"
              width={64}
              height={18}
            />
          </span>
        </header>

        <main tw="flex flex-grow overflow-hidden ">
          <div tw="w-3/5 flex justify-center items-end relative">
            <div tw="absolute text-white right[50%] top-11 flex flex-col width[350px]">
              <span tw="text-4xl font-bold leading-snug">PROJECT 2021</span>
              <small>
                On July 6, 2121, GS Demon Slayer Corps was sent back to 2021 to launch &quot;Project
                Vivy&ldquo; aiming to make Cloud Interactive history and facilitate projects in the
                future world.
              </small>
            </div>
            <Image src="/images/robot.png" alt="robot" width={611} height={670} />
          </div>

          <div tw="w-2/5">{children}</div>
        </main>
      </div>
    </Fade>
  )
}

export default LoginLayout
