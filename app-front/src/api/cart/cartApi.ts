import api from '@/api/axiosInstance'
import { API_URLS } from '@/constants/apiUrls'

class CartApi {
  async getCart() {
    return await api.get(API_URLS.CART_ITEMS)
  }

  async increaseCartQuantity(productId: number, quantity: number) {
    return await api.post(API_URLS.CART_INCREASE, { productId, quantity })
  }

  async decreaseCartQuantity(productId: number, quantity: number) {
    return await api.post(API_URLS.CART_DECREASE, { productId, quantity })
  }

  async deleteItem(productId: number) {
    return await api.post(API_URLS.CART_DELETE, { productId })
  }

  async mergeCart(cart: any) {
    console.log('[cartApi] mergeCart post with data - ', cart)
    return await api.post(API_URLS.CART_MERGE, cart)
  }
}

const cartApi = new CartApi()
export default cartApi
