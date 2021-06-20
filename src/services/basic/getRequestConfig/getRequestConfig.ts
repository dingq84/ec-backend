/**
 * @author Dean Chen 2021-06-08
 * 建立一個 getRequestConfig 主要去處理 form data 的傳輸時值的轉換
 */

import { AxiosRequestConfig } from 'axios'

// utils
import isFormData from '@/utils/services/isFormData'
import produce from '@reduxjs/toolkit/node_modules/immer'
import createFormData from '@/utils/services/createFormData'

function getRequestConfig(config: AxiosRequestConfig = {}): AxiosRequestConfig {
  if (isFormData(config)) {
    config = produce(config, draft => {
      draft.data = createFormData(Object.entries(config.data))
    })
  }

  return config
}

export default getRequestConfig
