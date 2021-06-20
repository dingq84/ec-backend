/**
 * @author Dean Chen 2021-06-07
 * 建立一個新增 axios 的實體的方法，目前僅單純判斷是否需要 token
 */

import axios from 'axios'
import { produce } from 'immer'

// models
import Token from '@/models/Token'

// types
import { CustomRequestConfig } from '@/types/services/config'

function getAxiosInstance(config: CustomRequestConfig = {}) {
  config = produce(config, draft => {
    if (!config.baseURL) {
      draft.baseURL = process.env.API_URL!
    }

    // 無 headers 時，指定空物件，方便後續新增
    if (!config.headers) {
      draft.headers = {}
    }

    if (!config.headers || !config.headers['Content-Type']) {
      draft.headers['Content-Type'] = 'application/json;charset=UTF-8'
    }

    if (config.withAuth) {
      const token = new Token()
      draft.headers.Authorization = `Bearer ${token.getToken}`
    }
  })

  return axios.create(config)
}

export default getAxiosInstance
