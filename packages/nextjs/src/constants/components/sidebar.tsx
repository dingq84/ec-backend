import { SidebarMenuType } from '@/types/components/sidebar'

const SIDEBAR_MENU: SidebarMenuType[] = [
  {
    id: 1,
    name: '首頁',
    href: '/',
    prefix: 'home.svg'
  },
  {
    id: 2,
    name: '訂單管理',
    href: '/order',
    prefix: 'order.svg'
  },
  {
    id: 3,
    name: '商品管理',
    href: '/commodity',
    prefix: 'commodity.svg'
  },
  {
    id: 4,
    name: '促銷管理',
    href: '/promotion',
    prefix: 'promotion.svg'
  },
  {
    id: 5,
    name: '物流管理',
    href: '/logistics',
    prefix: 'logistics.svg'
  },
  {
    id: 6,
    name: '會員管理',
    href: '/member',
    prefix: 'member.svg'
  },
  {
    id: 7,
    name: '帳號管理',
    href: '/account',
    prefix: 'account.svg'
  },
  {
    id: 8,
    name: '角色權限管理',
    href: '/role',
    prefix: 'role.svg'
  },
  {
    id: 13,
    name: '廣告管理',
    href: '/advertisement',
    prefix: 'advertisement.svg'
  },
  {
    id: 14,
    name: '門市管理',
    href: '/store',
    prefix: 'store.svg'
  },
  {
    id: 15,
    name: '前台首頁管理',
    href: '/forestage',
    prefix: 'forestage.svg'
  }
]

export default SIDEBAR_MENU
