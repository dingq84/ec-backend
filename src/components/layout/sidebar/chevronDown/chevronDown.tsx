/**
 * @author Ding.Chen 2021-06-18
 * Sidebar 的向左／向下的箭頭，提供給 extend 和 float sidebar 做使用
 */

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import tw from 'twin.macro'

const ChevronDown = ({ isOpen }: { isOpen: boolean }) => (
  <FontAwesomeIcon
    icon={faChevronLeft}
    tw="transition-transform"
    css={[isOpen && tw`transform -rotate-90 `]}
  />
)

export default ChevronDown
