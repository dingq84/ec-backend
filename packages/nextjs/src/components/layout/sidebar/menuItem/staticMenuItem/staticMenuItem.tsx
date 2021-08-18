import { useRouter } from 'next/router'
import tw, { css } from 'twin.macro'

// types
import { MenuItemProps } from '@/components/layout/sidebar/menuItem'

interface StaticMenuItemProps extends MenuItemProps {}

const activeGradient = css`
  & {
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.12393) 99.88%,
      rgba(255, 255, 255, 0) 111.08%
    );
  }
`

const StaticMenuItem = (props: StaticMenuItemProps) => {
  const { prefix, suffix, isFirstChild = false, children, href, id, name, ...restProps } = props
  const router = useRouter()
  const { asPath } = router
  const isActive = asPath === href

  return (
    <li tw="list-none w-full" css={[isActive && tw`rounded-lg`, isActive && activeGradient]}>
      <div
        tw="w-full flex text-blue-1 justify-start text-base items-center px-2 py-4 hover:(cursor-pointer)"
        {...restProps}
      >
        {prefix ? <span tw="mr-2.5 color[inherit]">{prefix}</span> : null}

        <span tw="color[inherit] select-none leading-none font-size[inherit]">{children}</span>

        {suffix ? <span tw="ml-auto color[inherit]">{suffix}</span> : null}
      </div>
    </li>
  )
}
export default StaticMenuItem
