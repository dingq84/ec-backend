import { useState, useRef, Fragment } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import tw, { styled } from 'twin.macro'

// components
import Collapse from '@/components/shared/collapse'
import Prefix from '@/components/layout/sidebar/prefix'

// hooks
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// types
import { SidebarMenuType } from '@/types/components/sidebar'

// utils
import hasActiveChildren from '@/utils/components/sidebar/hasActiveChildren'

const StyledDiv = styled.div`
  ${tw`w-full flex items-center text-white opacity-40 h-10 hover:(opacity-100 cursor-pointer)`}
`

const StyledSpan = styled.span`
  ${tw`flex-grow inline-block color[inherit] font-size[inherit] font-medium h-4 leading-4 px-2`}
`

interface InnerProps {
  items: SidebarMenuType[]
  open?: boolean
}

const Inner = (props: InnerProps) => {
  const { items, open: propOpen = false, ...restProps } = props
  const [open, setOpen] = useState(false)
  // 儲存渲染時是否是 isActive，不用 useState 是防止重新渲染
  const isActive = useRef(false)
  const router = useRouter()
  const { pathname } = router

  useEnhancedEffect(() => {
    if (propOpen === false) {
      setOpen(propOpen)
    }
  }, [propOpen])

  useEnhancedEffect(() => {
    setOpen(isActive.current)
  }, [])

  const toggleOpen = (): void => {
    setOpen(!open)
  }

  const handleClick = (href?: string) => {
    if (href && pathname !== href) {
      router.push(href)
    }
  }

  return (
    <>
      {items.map(item => {
        const { children, name, id, prefix, href } = item
        isActive.current = pathname === href || hasActiveChildren(children || [], pathname)

        if (children) {
          return (
            <Fragment key={id}>
              <StyledDiv
                css={[(open || isActive.current) && tw`opacity-100!`]}
                {...restProps}
                onClick={toggleOpen}
              >
                <Prefix url={prefix} tw="mr-3 text-xs pl-2.5" />
                <StyledSpan>{name}</StyledSpan>

                <span tw="pr-3 inline-block">
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    tw="transition-transform color[inherit]"
                    css={[open && tw`transform rotate-180`]}
                  />
                </span>
              </StyledDiv>
              <Collapse inProps={open} {...restProps}>
                <Inner items={children} tw="text-xs pl-4 h-8" />
              </Collapse>
            </Fragment>
          )
        }

        return (
          <StyledDiv
            key={id}
            {...restProps}
            css={[isActive.current && tw`opacity-100!`]}
            onClick={() => handleClick(href)}
          >
            <Prefix url={prefix} tw="mr-3 text-xs pl-2.5" />
            <StyledSpan>{name}</StyledSpan>
          </StyledDiv>
        )
      })}
    </>
  )
}

export default Inner
