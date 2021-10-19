/**
 * @author Dean Chen 2021-04-12
 * TransitionProps 為 react-transition-group 的 Transition 通用 props
 *
 * %----------transition lifecycle------------%
 * enter -> entering -> entered -> exit -> exiting ->exited
 */

interface TransitionProps {
  appear?: boolean
  onEnter?: Function
  onEntering?: Function
  onEntered?: Function
  onExit?: Function
  onExiting?: Function
  onExited?: Function
  timeout?: number
}

export type { TransitionProps }
