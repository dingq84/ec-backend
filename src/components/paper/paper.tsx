import { forwardRef, Ref } from 'react'
import 'twin.macro'

type PaperProps = {
  className?: string
  children: React.ReactNode
}

function Paper(props: PaperProps, ref: Ref<HTMLDivElement>) {
  const { className = '', children } = props
  return (
    <div
      ref={ref}
      className={className}
      tw="bg-gray-50 w-full p-4 rounded-md shadow-lg flex justify-center items-center sm:(w-auto) md:(inline-flex py-8 px-12)"
    >
      {children}
    </div>
  )
}

export default forwardRef(Paper)
