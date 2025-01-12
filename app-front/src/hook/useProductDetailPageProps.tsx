import { useState } from 'react'
import api from '@/config/axiosInstance'
import { openModal } from '@/util/redux/modalSlice'
import { ModalType } from '@/type/ModalType'

export const useProductDetailPageProps = () => {
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const addToLocalCart = (dispatch, props) => {
    const localCart = localStorage.getItem('cart')

    let cart: TypeProduct[] = []

    if (localCart) {
      cart = JSON.parse(localCart)
    }

    const newItem = {
      id: props.product.id,
      quantity: 1, // 새로운 아이템의 기본 quantity는 1
    } as TypeProduct

    const itemIndex = cart.findIndex((item) => item.id === newItem.id)

    if (itemIndex !== -1) {
      // 이미 존재하는 아이템이면 quantity를 증가시킴
      cart[itemIndex].quantity += 1
    } else {
      // 새로운 아이템이면 장바구니에 추가
      cart.push(newItem)
    }

    localStorage.setItem('cart', JSON.stringify(cart))

    dispatch(
      openModal({
        modalType: ModalType.CART_SUCCESS,
        content: {},
      }),
    )
  }

  const addToServerCart = (dispatch, props) => {
    api
      .post('/cart/add', {
        id: props.product.id,
        name: props.product.name,
      })
      .then((res) => {
        console.log(res.data)
        dispatch(
          openModal({
            modalType: ModalType.CART_SUCCESS,
            content: {},
          }),
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return {
    quantity,
    setQuantity,
    increaseQuantity,
    decreaseQuantity,
    addToLocalCart,
    addToServerCart,
  }
}

export default useProductDetailPageProps
