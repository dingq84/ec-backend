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
