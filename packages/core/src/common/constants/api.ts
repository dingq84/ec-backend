export enum ApiUrl {
  // auth
  login = 'auth/login',
  logout = 'auth/logout',
  refreshToken = 'auth/refresh_token',
  me = 'auth/me',

  // admin
  updatePassword = 'admin/update_password',
  adminList = 'admin/list',
  adminStatus = 'admin/status',
  createAdmin = 'admin/create',
  adminDetail = 'admin/detail',
  updateAdmin = 'admin/update',

  // permission
  permissionList = 'permission/list',

  // role
  roleList = 'role/list',
  roleStatus = 'role/status',
  createRole = 'role/create',
  roleDetail = 'role/detail',
  updateRole = 'role/update',
  roleAdminList = 'role/admin_list'
}
