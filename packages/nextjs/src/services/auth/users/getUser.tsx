import { useQuery } from 'react-query'

// constants
import { API_KEY, API_URL } from '@/constants/services/api'

// services
import getService from '@/services/basic/getService'

export default function getUser() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery(API_KEY.users, () => getService({ method: 'GET', url: API_URL.users }), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false
  })
}
