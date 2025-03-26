import api from '@/api/axiosInstance'
import { API_URLS } from '@/constants/apiUrls'
import axios from 'axios'

class AuthApi {
  async login(username: string, password: string) {
    return await api.post(API_URLS.LOGIN, { username, password })
  }

  async register(username: string, password: string) {
    return await api.post(API_URLS.REGISTER, { username, password })
  }

  async logout() {
    return await api.post(API_URLS.LOGOUT)
  }

  async refresh() {
    // not using api.post because we need to send request without Authorization header
    return await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}${API_URLS.REFRESH}`,
      null,
      {
        withCredentials: true,
      },
    )
  }
}

const authApi = new AuthApi()
export default authApi
