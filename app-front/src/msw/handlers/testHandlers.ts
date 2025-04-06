import { http, HttpResponse } from 'msw'
import { API_BASE_URL } from '@/constants/apiUrls'

export const testHandlers = [
  http.get(`${API_BASE_URL}/api/hello`, () => {
    return HttpResponse.json({
      message: 'hello from msw',
    })
  }),
]
