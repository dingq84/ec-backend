export enum ApiUrl {
  // auth
  login = 'auth/login',
  logout = 'auth/logout',
  refreshToken = 'auth/refresh_token',
  me = 'auth/me',

  // admin
  updatePassword = 'admin/update_password',

  // permission
  permissionList = 'permission/list',

  // role
  roleList = 'role/list',
  roleStatus = 'role/status',
  createRole = 'role/create',
  roleDetail = 'role/detail',
  updateRole = 'role/update'
}
