export enum ApiUrl {
  // auth
  login = 'auth/login',
  logout = 'auth/logout',
  refreshToken = 'auth/refresh_token',
  me = 'auth/me',

  // admin
  updatePassword = 'admin/update_password',
  adminList = 'admin/list',

  // permission
  permissionList = 'permission/list',

  // role
  roleList = 'role/list',
  roleStatus = 'role/status',
  createRole = 'role/create',
  roleDetail = 'role/detail',
  updateRole = 'role/update',
  roleAccountList = 'role/admin_list'
}
