import { useReducer } from 'react'

// core
import { Status } from '@ec-backstage/core/src/common/constants/status'

// types
import { Option } from '@/types/components/input'

export interface InitialStateProps {
  status: Status
  name: string
  account: string
  password: string
  roleId: string
  roleList: Option[]
}

const initialState: InitialStateProps = {
  status: Status.active,
  name: '',
  account: '',
  password: '',
  roleId: '',
  roleList: []
}

export type Action =
  | { type: 'reset' }
  | { type: 'setRoleList'; payload: { roleList: InitialStateProps['roleList'] } }
  | { type: 'updateName'; payload: { name: string } }
  | { type: 'updateStatus'; payload: { status: Status } }
  | { type: 'updateAccount'; payload: { account: string } }
  | { type: 'updatePassword'; payload: { password: string } }
  | { type: 'updateRoleId'; payload: { roleId: string } }

const reducer = (state: InitialStateProps, action: Action): InitialStateProps => {
  switch (action.type) {
    case 'reset':
      return initialState
    case 'setRoleList':
      return {
        ...state,
        roleList: action.payload.roleList
      }
    case 'updateName':
      return {
        ...state,
        name: action.payload.name
      }
    case 'updateStatus':
      return {
        ...state,
        status: action.payload.status
      }
    case 'updateAccount':
      return {
        ...state,
        account: action.payload.account
      }
    case 'updatePassword':
      return {
        ...state,
        password: action.payload.password
      }
    case 'updateRoleId':
      return {
        ...state,
        roleId: action.payload.roleId
      }
    default:
      return state
  }
}
const useDrawerReducer = () => {
  return useReducer(reducer, initialState)
}

export default useDrawerReducer
