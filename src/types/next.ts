/**
 * @author Dean Chen 2021-04-20
 * 1. MyPage 替原本 next page 新增 auth & layout 的 props，為了各個頁面是否需要 layout 和驗證的設定
 * 2. BasicComponentProps 為替所有 React Component 新增 css 和 children 的 props，
 * 前者為了可以讓 twin.macro 客製化其他 component，後者為減少重複設定
 */
import { NextPage } from 'next'

// types
import type { TwStyle } from 'twin.macro'

type MyPage = NextPage & { layout?: React.FC<{ children: React.ReactNode }>; auth?: boolean }

// 允許外部客製化 style 的 component 都預設開 css 接口
type BasicComponentProps = {
  // IMPORTANT: 這邊開個 css 接口允許外部傳入客製化樣式，但在下方不可解構出來，
  // 因為 twin.macro 會將其轉譯成多個屬性，因此需要 restProps 全部撒進去
  css?: TwStyle[]
  children?: React.ReactNode
}

export type { MyPage, BasicComponentProps }
