import api from '@/api/axiosInstance'

class CartApi {
  async getCart() {
    return await api.get('/cart/items')
  }

  async increaseCartQuantity(productId: number, quantity: number) {
    return await api.post('/cart/increase', { productId, quantity })
  }

  async decreaseCartQuantity(productId: number, quantity: number) {
    return await api.post('/cart/decrease', { productId, quantity })
  }

  async deleteItem(productId: number) {
    return await api.post('/cart/delete', { productId })
  }

  async mergeCart(cart: any) {
    console.log('[cartApi] mergeCart post with data - ', cart)
    return await api.post('/cart/merge', cart)
  }
}

const cartApi = new CartApi()
export default cartApi
