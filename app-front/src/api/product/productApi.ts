import api from '@/api/axiosInstance'

class ProductApi {
  async addNewProduct(product: TypeProduct) {
    return await api.post('/product/new', product)
  }

  async getAllProducts() {
    return await api.get('/product/all')
  }

  async getProductDetail(productId: number) {
    return await api.get(`/product/${productId}`)
  }
}

const productApi = new ProductApi()
export default productApi
