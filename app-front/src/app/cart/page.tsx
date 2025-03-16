'use client'

import CartHeadRow from '@/ui/component/cart/CartHeadRow'
import styled from 'styled-components'
import { useEffect, useState } from 'react'

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
  const [localCart, setLocalCart] = useState<TypeProduct[]>([])

  useEffect(() => {
    const localCartString = localStorage.getItem('cart')
    const localCartList = localCartString ? JSON.parse(localCartString) : []
    console.log('localCartList ', localCartList)
    setLocalCart(localCartList)
  }, [localStorage])

  return (
    <>
      <Wrapper>
        {localCart.length > 0 ? (
          localCart.map((item) => {
            return <CartHeadRow key={item.id} item={item} />
          })
        ) : (
          <></>
        )}
        {/*<CartHeadRow />*/}
      </Wrapper>
    </>
  )
}
