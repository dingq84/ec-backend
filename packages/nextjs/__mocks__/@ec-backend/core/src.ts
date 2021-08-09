import { either } from 'fp-ts/lib'

const auth = {
  token: {
    logout() {
      either.right('success')
    }
  },
  me: {}
}

const core = {
  auth
}

export default core
