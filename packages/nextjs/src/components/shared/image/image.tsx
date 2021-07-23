/**
 * @author Dean Chen 2021-06-09
 * @link https://github.com/cyrilwanner/next-optimized-images
 * 使用 next-optimized-image，提供許多優化 image 的方式，不使用 next/image 本身是因為不支援 SSG，
 * 目前預設圖片為 font-awesome 和 png 檔案， png 會優先使用 webp
 */

import { HTMLAttributes } from 'react'
import 'twin.macro'

export interface ImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

const Image = (props: ImageProps) => {
  const { src, alt, ...restProps } = props
  return (
    <picture>
      <source srcSet={`${src}?webp`} type="image/webp" />
      <img tw="object-contain" src={src} alt={alt} {...restProps} />
    </picture>
  )
}

export default Image
