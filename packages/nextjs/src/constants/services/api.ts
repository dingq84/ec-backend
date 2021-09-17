enum ApiKey {
  // auth
  login = 'login',
  logout = 'logout',
  me = 'me',
  isLogged = 'isLogged',
  refreshToken = 'refreshToken',

  // admin
  accountList = 'accountList',

  // permission
  permissionList = 'permissionList',

  // role
  roleList = 'roleList',
  roleDetail = 'roleDetail',
  roleAccountList = 'roleAccountList'
}

export { ApiKey }
