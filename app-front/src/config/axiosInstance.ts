import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    console.log('interceptor working!')
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 응답 인터셉터
api.interceptors.response.use(
  // 정상 응답일 경우 그대로 반환
  (res) => res,
  async (err) => {
    const originalRequest = err.config
    console.log('originalRequest ', originalRequest)
    console.log('retry 여부: ', originalRequest._retry)

    // 403 에러이면 refresh 시도
    if (
      err.response &&
      err.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true // 무한 루프 방지
      console.log('403 Error. Refresh token을 이용해 재시도합니다.')

      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        try {
          const res = await axios.post('http://localhost:8080/auth/refresh', {
            refreshToken,
          })
          if (res.status === 200) {
            console.log('refresh 성공. new access token을 세팅합니다.')
            const { accessToken } = res.data
            if (accessToken) {
              localStorage.setItem('accessToken', accessToken)
              originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
              console.log('new access token으로 기존 요청을 다시 시도합니다.')
              return api(originalRequest)
            }
          }
        } catch (refreshError) {
          console.error('refresh 실패: ', refreshError)
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          window.location.href = '/auth/login'
        }
      } else {
        console.log('refresh token이 없습니다. 로그인 페이지로 이동합니다.')
        window.location.href = '/auth/login'
      }
    }

    // 403 이외의 에러이면 그냥 반환
    return Promise.reject(err)
  },
)

export default api
