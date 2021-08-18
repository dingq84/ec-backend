import Link from 'next/link'
import Image from 'next/image'
import tw from 'twin.macro'

// contexts
import { useSidebarContext } from '@/components/layout/sidebar/context'

const Logo = () => {
  const { isFloat } = useSidebarContext()

  return (
    <Link href="/">
      <a
        tw="inline-flex justify-center mb-14"
        css={[isFloat && tw`pl-0 w-full`, !isFloat && tw`pl-3`]}
      >
        <Image src="/images/logo.svg" alt="logo" layout="fill" />
        {!isFloat ? (
          <Image src="/images/logoWord.svg" alt="vivy admin website" tw="pl-2" layout="fill" />
        ) : null}
      </a>
    </Link>
  )
}

export default Logo
