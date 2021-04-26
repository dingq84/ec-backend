import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

type BASIC_SIDEBAR_MENU_TYPE = {
  icon: IconDefinition
  name: string // the name of menu
  children?: Array<BASIC_SIDEBAR_MENU_TYPE> // menu's children
  href?: string // the href of menu item
}

type SIDEBAR_MENU_TYPE = BASIC_SIDEBAR_MENU_TYPE & {
  key: string // the key of menu
  isActive: boolean // whether the menu is active or not
  isOpen: boolean // whether the menu is open or not
  level: number // the level of the menu. the menu item is more low, it's level is more high
  children?: Array<SIDEBAR_MENU_TYPE> // menu's children
}

export type { BASIC_SIDEBAR_MENU_TYPE, SIDEBAR_MENU_TYPE }
