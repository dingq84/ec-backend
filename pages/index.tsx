import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCogs } from '@fortawesome/free-solid-svg-icons'

import tw, { styled } from 'twin.macro'

// utils
import withAuth from '@/utils/withAuth'
import React from 'react'

const StyledSpan = styled.span`
  ${tw`text-sm text-center h-12 block leading-12 hover:(bg-light-blue-3 cursor-pointer)`}
`

const Home: React.FC<{}> = () => {
  return (
    <div role="wrapper" tw="min-h-full">
      <header tw="relative z-10">
        <Link href="/">
          <a tw="transition-width duration-300 block w-full h-12 leading-12 text-center font-size[1.25rem] bg-light-blue-3 text-white md:(float-left w-60)">
            <span tw="font-light">
              <b>Admin</b>LTE
            </span>
          </a>
        </Link>
        <nav tw="flex justify-between duration-300 text-white bg-light-blue-2 md:(ml-60)">
          {/* TODO: Trigger global settings */}
          <StyledSpan tw="w-11">
            <FontAwesomeIcon icon={faBars} />
          </StyledSpan>
          <div>
            <ul tw="flex items-stretch all-child:px-4">
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
      <aside></aside>
      <footer></footer>
    </div>
  )
}

export default withAuth(Home)
