/**
 * @author Ding.Chen 2021-06-18
 * 後台完整 sidebar menu，根據 api 提供的權限做過濾
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'

const SIDEBAR_MENU = [
  {
    prefix: <FontAwesomeIcon icon={faUserCog} />,
    name: '訂單管理',
    href: '/'
  },
  {
    prefix: <FontAwesomeIcon icon={faUserCog} />,
    name: '會員管理',
    children: [
      {
        prefix: <FontAwesomeIcon icon={faUserCog} />,
        name: '會員列表與詳細頁',
        href: '/account/info',
        children: [
          {
            prefix: <FontAwesomeIcon icon={faUserCog} />,
            name: '會員列表與詳細頁',
            href: '/account/info/a'
          },
          {
            prefix: <FontAwesomeIcon icon={faUserCog} />,
            name: '匯出會員資訊',
            href: '/account/info/b'
          }
        ]
      },
      {
        prefix: <FontAwesomeIcon icon={faUserCog} />,
        name: '匯出會員資訊',
        href: '/account/export'
      }
    ]
  },
  {
    prefix: <FontAwesomeIcon icon={faUserCog} />,
    name: '商品管理',
    href: '/product'
  },
  {
    prefix: <FontAwesomeIcon icon={faUserCog} />,
    name: '促銷管理',
    href: '/promote'
  }
]

export default SIDEBAR_MENU
