enum Status {
  entering = 'entering',
  entered = 'entered',
  exiting = 'exiting',
  exited = 'exited'
}

type TransitionProps = {
  appear?: boolean
  onEnter?: Function
  onEntering?: Function
  onEntered?: Function
  onExit?: Function
  onExiting?: Function
  onExited?: Function
  timeout?: number
}

export { Status }

export type { TransitionProps }
