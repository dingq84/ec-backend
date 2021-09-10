import { useReducer } from 'react'

// core
import { Status } from '@ec-backstage/core/src/role/domain/interface/iRoleEntity'
import { IGetPermissionListOutputPort } from '@ec-backstage/core/src/permission/application/interface/iGetPermissionListUseCase'

interface InitialStateProps {
  name: string
  status: Status
  permissions: IGetPermissionListOutputPort[]
}

const initialState: InitialStateProps = {
  name: '',
  status: Status.active,
  permissions: []
}

type Action =
  | { type: 'reset' }
  | { type: 'setPermissionData'; payload: { permissions: IGetPermissionListOutputPort[] } }
  | { type: 'updateName'; payload: { name: string } }
  | { type: 'updateStatus'; payload: { status: Status } }
  | { type: 'updateParentPermission'; payload: { id: number; value: boolean } }
  | { type: 'updateChildPermission'; payload: { id: number; value: boolean; parentId: number } }

const reducer = (state: InitialStateProps, action: Action): InitialStateProps => {
  switch (action.type) {
    case 'reset':
      return initialState
    case 'setPermissionData':
      return {
        ...state,
        permissions: action.payload.permissions
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
    case 'updateParentPermission':
      return {
        ...state,
        permissions: state.permissions.map(permission => {
          if (permission.id !== action.payload.id) {
            return permission
          }

          return {
            ...permission,
            value: action.payload.value,
            children: permission.children.map(child => ({ ...child, value: action.payload.value }))
          }
        })
      }
    case 'updateChildPermission':
      return {
        ...state,
        permissions: state.permissions.map(permission => {
          if (permission.id !== action.payload.parentId) {
            return permission
          }

          return {
            ...permission,
            children: permission.children.map(child => {
              if (child.id !== action.payload.id) {
                return child
              }

              return {
                ...child,
                value: action.payload.value
              }
            }),
            value: permission.children.every(child => {
              if (child.id !== action.payload.id) {
                return child.value
              }
              return action.payload.value
            })
          }
        })
      }
    default:
      return state
  }
}
const useDrawerReducer = () => {
  return useReducer(reducer, initialState)
}

export default useDrawerReducer
