import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCogs } from '@fortawesome/free-solid-svg-icons'
import tw, { styled } from 'twin.macro'

// components
import Collapse from '@/components/common/collapse'

// states
import { useAppDispatch, useAppSelector } from '@/states/global/hooks'
import { toggleSidebar } from '@/states/global/settings'

// utils
import withAuth from '@/utils/withAuth'

const StyledSpan = styled.span`
  ${tw`px-4 text-sm text-center h-12 block leading-12 hover:(bg-light-blue-3 cursor-pointer)`}
`

const Home: React.FC<{}> = () => {
  const sidebarIsExtend = useAppSelector(state => state.settings.sidebarIsExtend)
  const dispatch = useAppDispatch()

  return (
    <div role="wrapper" tw="min-h-full">
      <header tw="relative z-20">
        <Link href="/">
          <a tw="transition-width duration-300 block w-full h-12 leading-12 text-center font-size[1.25rem] bg-light-blue-3 text-white md:(float-left w-60)">
            <span tw="font-light">
              <b>Admin</b>LTE
            </span>
          </a>
        </Link>
        <nav tw="flex justify-between duration-300 text-white bg-light-blue-2 md:(ml-60)">
          <StyledSpan tw="w-11" onClick={() => dispatch(toggleSidebar())}>
            <FontAwesomeIcon icon={faBars} />
          </StyledSpan>
          <div>
            <ul tw="flex items-stretch">
              <li>
                <StyledSpan>Alexander Pierce</StyledSpan>
              </li>
              <li>
                <StyledSpan>
                  <FontAwesomeIcon icon={faCogs} />
                </StyledSpan>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <div tw="flex min-height[calc(100vh - 3rem)]">
        <Collapse inProps={sidebarIsExtend} orientation="horizontal" collapsedSize="50px">
          <aside tw="flex-shrink-0 bg-dark-blue-1 w-12 md:(w-60 min-height[calc(100vh - 3rem)])"></aside>
        </Collapse>
        <main tw="flex-shrink-0 flex-grow  bg-red-500"></main>
      </div>
      <footer></footer>
    </div>
  )
}

export default withAuth(Home)
