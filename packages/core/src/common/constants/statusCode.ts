/**
 * @author Ding.Chen 2021-08-15
 * 存放 api 回傳的狀態碼，分成兩種
 * 1. 四碼數字為 server 回傳的錯誤代碼
 * 2. client-四碼數字開頭為 client 檢核錯誤
 */

export enum StatusCode {
  network = 'client-0001',
  // auth
  emptyAccountOrPassword = 'client-0002',
  wrongAccountFormat = 'client-0003',
  wrongAccountOrPassword = '1101',

  // admin
  wrongAccountId = 'client-004',
  wrongPasswordFormat = 'client-005',
  passwordIsNotSame = 'client-006',
  wrongPassword = '1302',
  newPasswordIsSameAsOldPassword = '1303',

  // role
  wrongRoleId = 'client-0007',
  wrongRoleStatus = 'client-008',
  roleIsNotExist = '1402',
  roleCanNotUpdate = '1404',

  // global
  // 帳號已被停權
  accountFrozen = '1003',
  // 成功
  success = '0000',
  // 參數錯誤
  parameter = '1000',
  // 無權限
  unauthorized = '9000',
  // Token 已被註銷
  tokenCancel = '9001',
  // Token 過期
  tokenExpire = '9002',
  // 系統存取失敗
  system = '9999'
}
