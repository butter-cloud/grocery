'use client'

import CartHeadRow from '@/ui/component/cart/CartHeadRow'
import styled from 'styled-components'

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
  return (
    <>
      <Wrapper>
        <CartHeadRow />
      </Wrapper>
    </>
  )
}
