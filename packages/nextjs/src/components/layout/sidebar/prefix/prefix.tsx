import { DOMAttributes } from 'react'
import Image from 'next/image'
import 'twin.macro'

interface PrefixProps extends DOMAttributes<HTMLDivElement> {
  url?: string
}

const Prefix = (props: PrefixProps) => {
  const { url, ...restProps } = props
  return url ? (
    <Image
      src={`/icons/sidebar/${url}`}
      alt="sidebar icon"
      width={20}
      height={20}
      tw="mr-2.5 color[inherit] text-center leading-none"
      {...restProps}
    />
  ) : null
}

export default Prefix
