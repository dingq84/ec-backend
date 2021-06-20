/**
 * @author Dean Chen 2021-04-15
 * @link https://github.com/mui-org/material-ui/blob/next/packages/material-ui-unstyled/src/Portal/Portal.js
 * Portal 主要是為了製作出 Modal、Drawer 等，跳脫原本 root node 的 element，程式碼來自 Material-UI
 */

import { useState, forwardRef, cloneElement, isValidElement } from 'react'
import { createPortal } from 'react-dom'

// hooks
import useForkRef from '@/hooks/useForkRef'
import useEnhancedEffect from '@/hooks/useEnhancedEffect'

// types
import type { PortalProps } from '@/types/components/portal'

// utils
import setRef from '@/utils/shared/setRef'

function getContainer(container: PortalProps['container']) {
  return typeof container === 'function' ? container() : container
}

const Portal: React.ForwardRefRenderFunction<HTMLElement, PortalProps> = (
  props: PortalProps,
  ref
) => {
  const { disablePortal = false, container, children } = props
  const [mountNode, setMountNode] = useState<HTMLElement>()
  const isValidChildren = isValidElement(children)
  const handleRef = useForkRef(isValidChildren ? children.ref : null, ref)

  useEnhancedEffect(() => {
    if (!disablePortal) {
      setMountNode(getContainer(container) || document.body)
    }
  }, [container, disablePortal])

  useEnhancedEffect(() => {
    if (mountNode && !disablePortal) {
      setRef(ref, mountNode)
      return () => {
        setRef(ref, null)
      }
    }
  }, [ref, mountNode, disablePortal])

  if (disablePortal) {
    if (isValidChildren) {
      return cloneElement(children, {
        ref: handleRef
      })
    }
    return children
  }

  return mountNode ? createPortal(children, mountNode as Element) : null
}

export default forwardRef(Portal)
