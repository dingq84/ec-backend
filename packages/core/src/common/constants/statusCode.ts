/**
 * @author Ding.Chen 2021-08-15
 * 存放 api 回傳的狀態碼，分成兩種
 * 1. 四碼數字為 server 回傳的錯誤代碼
 * 2. client-四碼數字開頭為 client 檢核錯誤
 */

export enum StatusCode {
  network = 'client-0001',
  // 登入
  emptyAccountOrPassword = 'client-0002',
  wrongAccountFormat = 'client-0003',
  wrongAccountOrPassword = '1001',

  // 變更密碼
  wrongPasswordFormat = 'client-004',
  passwordIsNotSame = 'client-005',
  wrongPassword = '1302',
  newPasswordIsSameAsOldPassword = '1303',

  // 角色
  wrongStatus = 'client-006',
  roleIsNotExist = '1402',
  roleCanNotUpdate = '1404',

  // 全局
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
