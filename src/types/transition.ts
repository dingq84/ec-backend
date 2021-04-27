/**
 * @author Dean Chen 2021-04-12
 * 1. Status 為 react-transition-group 的 Transition 的 Status 變化
 * 2. TransitionProps 為 react-transition-group 的 Transition 通用 props
 *
 * %----------transition lifecycle------------%
 * enter -> entering -> entered -> exit -> exiting ->exited
 */

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
