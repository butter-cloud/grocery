import { useLogin } from '@/hook/useLogin'
import api from '@/api/axiosInstance'
import cartApi from '@/api/cart/cartApi'

const useCartProps = () => {
  const { isLogin } = useLogin()

  /**
   * 장비구니 수량 증가.
   * 로그인 되어있으면 서버에 요청해서 DB cart 업데이트,
   * 로그인 안되어있으면 localStorage에 cart 업데이트.
   *
   * @param productId
   * @param quantity default 1
   */
  const increaseCartQuantity = (productId, quantity = 1) => {
    if (isLogin) {
      cartApi
        .increaseCartQuantity(productId, quantity)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      const localCart = localStorage.getItem('cart')
      let cart: TypeProduct[] = []

      if (localCart) {
        cart = JSON.parse(localCart)
      }
      const itemIndex = cart.findIndex((item) => item.id === productId)
      if (itemIndex !== -1) {
        cart[itemIndex].quantity += 1
      }
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }

  /**
   * 장비구니 수량 감소.
   * 로그인 되어있으면 서버에 요청해서 DB cart 업데이트,
   * 로그인 안되어있으면 localStorage에 cart 업데이트.
   * 수량이 1 이하이면 삭제.
   * @param productId
   * @param quantity default 1
   */
  const decreaseCartQuantity = (productId, quantity = 1) => {
    if (isLogin) {
      cartApi
        .decreaseCartQuantity(productId, quantity)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      const localCart = localStorage.getItem('cart')
      let cart: TypeProduct[] = []

      if (localCart) {
        cart = JSON.parse(localCart)
      }
      const itemIndex = cart.findIndex((item) => item.id === productId)
      if (itemIndex !== -1) {
        cart[itemIndex].quantity -= 1
      }
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }

  /**
   * 장바구니에서 상품 삭제.
   * 로그인 되어있으면 서버에 요청해서 DB cart 업데이트,
   * 로그인 안되어있으면 localStorage에 cart 업데이트.
   * 장바구니에 상품이 없으면 페이지 새로고침.
   *
   * @param productId
   */
  const deleteItem = (productId) => {
    if (isLogin) {
      cartApi
        .deleteItem(productId)
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            window.location.reload()
          }
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      const localCart = localStorage.getItem('cart')
      let cart: TypeProduct[] = []

      if (localCart) {
        cart = JSON.parse(localCart)
      }
      const itemIndex = cart.findIndex((item) => item.id === productId)
      if (itemIndex !== -1) {
        cart.splice(itemIndex, 1)
      }
      localStorage.setItem('cart', JSON.stringify(cart))
      if (cart.length === 0) {
        window.location.reload()
      }
    }
  }

  return {
    increaseCartQuantity,
    decreaseCartQuantity,
    deleteItem,
  }
}

export default useCartProps
