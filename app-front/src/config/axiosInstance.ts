import axios from 'axios'
import { getCookie, setAccessToken } from '@/util/CookieHelper'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

//
// api.interceptors.request.use(
//   (config) => {
//     console.log('interceptor working!')
//     const token = getCookie('accessToken')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )
//
// api.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async (error) => {
//     const originalRequest = error.config
//
//     if (
//       (error.response?.status === 401 || error.response?.status === 403) &&
//       !originalRequest._retry
//     ) {
//       console.log(
//         `interceptor error ${error.response?.status} - refresh trying ...`,
//       )
//       originalRequest._retry = true
//
//       try {
//         const refreshResponse = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
//           { withCredentials: true },
//         )
//
//         console.log('refresh response body : ', refreshResponse.data)
//
//         const newAccessToken = refreshResponse.data.accessToken
//
//         console.log('newAccessToken: ', newAccessToken)
//         setAccessToken(newAccessToken)
//
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
//
//         // retry original request
//         return api(originalRequest)
//       } catch (refreshError) {
//         console.error('Token refresh failed', refreshError)
//         window.location.href = '/auth/login'
//         return Promise.reject(refreshError)
//       }
//     }
//     return Promise.reject(error)
//   },
// )

export default api
