/**
 * @author Dean Chen 2021-06-08
 * 建立一個 helper function 去檢查現在是否是 form data 格式
 */

import { AxiosRequestConfig } from 'axios'

function isFormData(config: AxiosRequestConfig): boolean {
  if ((config.method || 'GET').toLocaleUpperCase() === 'GET') {
    return false
  }

  if (!config.headers) {
    return false
  }

  if (config.headers['Content-Type'] !== 'multipart/form-data') {
    return false
  }

  return true
}

export default isFormData
