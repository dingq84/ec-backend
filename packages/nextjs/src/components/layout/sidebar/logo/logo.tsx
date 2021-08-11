import Link from 'next/link'
import tw from 'twin.macro'

// components
import Image from '@/components/shared/image'

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
        <Image src="images/logo.svg" alt="logo" />
        {!isFloat ? <Image src="images/logoWord.svg" alt="vivy admin website" tw="pl-2" /> : null}
      </a>
    </Link>
  )
}

export default Logo
