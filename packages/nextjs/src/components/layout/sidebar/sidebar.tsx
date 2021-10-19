import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import tw, { css } from 'twin.macro'

// components
import Outer from '@/components/layout/sidebar/outer'
import Collapse from '@/components/shared/collapse'

// states
import { useAppDispatch, useAppSelector } from '@/states/hooks'
import { toggleSidebar } from '@/states/settings'

const backgroundGradient = css`
  & {
    background: linear-gradient(183.74deg, #191b2c -30.18%, #161054 59.34%, #393091 110.71%);
  }
`

const Sidebar = () => {
  const dispatch = useAppDispatch()
  const sidebarIsExtend = useAppSelector(state => state.settings.sidebarIsExtend)
  const sidebarMenu = useAppSelector(state => state.me.menu)

  const handleClick = (): void => {
    dispatch(toggleSidebar())
  }

  return (
    <aside css={[backgroundGradient]} tw="py-5 flex flex-col flex-shrink-0 px-3">
      <button
        className="flex-center btn-outline"
        onClick={handleClick}
        tw="absolute transition-all duration-300 left-52 top-16 rounded-full text-gray-3 bg-white p-0 w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 shadow-md border border-solid border-gray-1 hover:(text-blue-1 border-purple-1)"
        css={[
          sidebarIsExtend === false && tw`left-20 -translate-x-full`,
          sidebarMenu.length === 0 && tw`translate-x-1/2`
        ]}
        role="presentation"
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          tw="color[inherit] text-xs transition-transform duration-300"
          css={[sidebarIsExtend && tw`transform rotate-180`]}
        />
      </button>

      <Link href="/">
        <a tw="inline-flex justify-start mb-14 pl-3">
          <Image src="/images/logo.svg" alt="logo" width={24} height={20} />
          <Collapse inProps={sidebarIsExtend} tw="ml-2" orientation="horizontal">
            <Image src="/images/logoWord.svg" alt="vivy admin website" width={64} height={18} />
          </Collapse>
        </a>
      </Link>

      <div className="scroll-y">
        <ul
          tw="flex-grow"
          css={[sidebarIsExtend && tw`mr-3`, sidebarMenu.length === 0 && tw`w-48`]}
        >
          {sidebarMenu.map(menu => (
            <Outer menu={menu} key={menu.id} />
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
