type PortalProps = {
  // 這邊不使用 ReactNode，原因為 TS 會一直警告 children 無 ref 和 props，
  // https://github.com/Microsoft/TypeScript/issues/6471
  // 上述 issue 解決方式為 any
  children?: any
  disablePortal?: boolean
  container?: HTMLElement | Function
}

export type { PortalProps }
