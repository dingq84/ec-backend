// services
import getAxiosInstance from '@/services/basic/getAxiosInstance'
import getRequestConfig from '@/services/basic/getRequestConfig/getRequestConfig'

// types
import type { CustomRequestConfig } from '@/types/services/config'

function getService(config: CustomRequestConfig) {
  const instance = getAxiosInstance(config)
  const requestConfig = getRequestConfig(config)
  return instance(requestConfig)
}

export default getService
