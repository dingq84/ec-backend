import { rest } from 'msw'

import { ApiUrl } from '@/common/constants/api'
import dataJson from './data.json'

export const handlers = [
  rest.get(`/${ApiUrl.permissionList}`, (request, response, context) => {
    return response(
      context.status(200),
      context.json({
        data: {
          permission: dataJson.permissionList
        },
        serverTime: '2021-12-22 14:47:32',
        statusCode: '0000',
        statusCodeTitle: '',
        statusMessage: '執行成功'
      })
    )
  })
]
