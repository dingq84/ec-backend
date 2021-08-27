/**
 * @author Ding.Chen 2021-06-18
 * 後台完整 sidebar menu，根據 api 提供的權限做過濾
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'

const SIDEBAR_MENU = [
  {
    prefix: <FontAwesomeIcon icon={faUserCog} />,
    id: 1,
    name: '訂單管理',
    href: '/wqee'
  },
  {
    prefix: <FontAwesomeIcon icon={faUserCog} />,
    id: 2,
    name: '會員管理',
    children: [
      {
        id: 3,
        name: '會員列表與詳細頁',
        href: '/account/info'
      },
      {
        id: 4,
        name: '匯出會員資訊',
        href: '/account/export',
        children: [
          {
            id: 7,
            name: '會員列表與詳細頁',
            href: '/account/info'
          },
          {
            id: 8,
            name: '匯出會員資訊',
            href: '/'
          }
        ]
      }
    ]
  },
  {
    prefix: <FontAwesomeIcon icon={faUserCog} />,
    id: 5,
    name: '商品管理',
    href: '/product',
    children: [
      {
        id: 12,
        name: '商品管理',
        href: '/product'
      }
    ]
  },
  {
    prefix: <FontAwesomeIcon icon={faUserCog} />,
    id: 6,
    name: '促銷管理',
    href: '/promote'
  }
]

export default SIDEBAR_MENU
