// /**
//  * @author Dean Chen 2021-04-27
//  * Sidebar 完成基本的 menu tree 顯示，並加上桌機版時，可縮小 sidebar 變成 hover 效果
//  *
//  * @modified
//  * [Dean Chen 2021-06-17]: 重構
//  * Features
//  * 1. 預設全展開或全收和
//  * 2. 有 collapse 和 popup 兩種形式
//  * 3. 只渲染出目前層的下一層，在下去的不渲染
//  * 4. 判斷目前在哪個 link，需有樣式，在 popup 時，該 link 的最根層需有樣式
//  * 5. 如果是全收和狀態，需展開目前的那個 link
//  */

import 'twin.macro'

// components
import Container from '@/components/layout/sidebar/container'
import Logo from '@/components/layout/sidebar/logo'
import Menu from '@/components/layout/sidebar/menu'
import MenuItem from '@/components/layout/sidebar/menuItem'
import SubMenu from '@/components/layout/sidebar/subMenu'

// constants
import SIDEBAR_MENU from '@/constants/components/sidebar'

const Sidebar = () => {
  return (
    <aside
      className="bg-gradient-to-b from-blue-8 via-blue-purple-1 to-primary"
      tw="py-5 overflow-y-auto flex flex-col flex-shrink-0"
    >
      <Container>
        <Logo />
        <Menu>
          {SIDEBAR_MENU.map(menu =>
            menu.children ? (
              <SubMenu menu={menu} key={menu.id} />
            ) : (
              <MenuItem key={menu.id} {...menu}>
                {menu.name}
              </MenuItem>
            )
          )}
        </Menu>
      </Container>
    </aside>
  )
}

export default Sidebar
