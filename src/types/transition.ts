export enum Status {
  entering = 'entering',
  entered = 'entered',
  exiting = 'exiting',
  exited = 'exited'
}

export type TransitionProps = {
  onEnter?: Function
  onEntering?: Function
  onEntered?: Function
  onExit?: Function
  onExiting?: Function
  onExited?: Function
  timeout?: number
}
