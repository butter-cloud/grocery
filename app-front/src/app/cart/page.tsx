'use client'

import styled from 'styled-components'
import { useEffect, useState } from 'react'
import cartApi from '@/api/cart/cartApi'
import { isLogin } from '@/util/CommonUtil'
import CartRow from '@/ui/component/cart/CartRow'

const Wrapper = styled.div`
  margin: 50px;
  border-top: 1px solid ${({ theme }) => theme.colors.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 20px;

  @media (max-width: 600px) {
    margin-right: 30px;
    margin-left: 30px;
  }
`
export default function CartPage() {
  const [cartItems, setCartItems] = useState<TypeCartItem[]>([])

  useEffect(() => {
    console.log('isLogin util', isLogin())
    if (isLogin()) {
      console.log('서버 장바구니를 조회합니다.')
      // 서버 장바구니 조회
      cartApi
        .getCart()
        .then((res) => {
          console.log('cart items from server: ', res)
          console.log('cart item list: ', res.data.data)
          setCartItems(res.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      // 로컬 장바구니 조회
      if (typeof window !== 'undefined') {
        const localCartString = localStorage.getItem('cart')
        const localCartList = localCartString ? JSON.parse(localCartString) : []
        console.log('localCartList ', localCartList)
        setCartItems(localCartList)
      }
    }
  }, [])

  return (
    <>
      <Wrapper>
        {cartItems.length > 0 ? (
          cartItems.map((item) => {
            return <CartRow key={item.id} item={item} />
          })
        ) : (
          <>장바구니에 상품이 없습니다.</>
        )}
      </Wrapper>
    </>
  )
}
