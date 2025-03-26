import api from '@/api/axiosInstance'
import { API_URLS } from '@/constants/apiUrls'

class ProductApi {
  async addNewProduct(product: TypeProduct) {
    return await api.post(API_URLS.PRODUCT_NEW, product)
  }

  async getAllProducts() {
    return await api.get(API_URLS.PRODUCT_ALL)
  }

  async getProductDetail(productId) {
    return await api.get(API_URLS.PRODUCT_DETAIL, {
      params: {
        id: productId,
      },
    })
  }
}

const productApi = new ProductApi()
export default productApi
