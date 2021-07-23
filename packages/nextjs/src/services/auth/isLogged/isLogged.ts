// constants
import { API_KEY, API_URL } from '@/constants/services/api'

// services
import getService from '@/services/basic/getService'
import useNoCacheQuery from '@/services/basic/useNoCacheQuery'

export default function isLogged() {
  return useNoCacheQuery(API_KEY.isLogged, () => getService({ url: API_URL.users }))
}
