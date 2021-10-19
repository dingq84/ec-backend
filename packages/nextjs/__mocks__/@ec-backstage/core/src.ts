import { either } from 'fp-ts/lib'

const auth = {
  token: {
    logout() {
      return either.right('success')
    }
  },
  me: {}
}

const core = {
  auth
}

export default core
