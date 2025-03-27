'use client'

import styled from 'styled-components'
import { Button } from '@/ui/component/common/Button'
import ShippingAddressContainer from '@/ui/component/order/ShippingAddressContainer'
import CollapsibleBox from '@/ui/component/common/CollapsibleBox'
import TotalAmountContainer from '@/ui/component/order/TotalAmountContainer'
import PaymentMethodContainer from '@/ui/component/order/PaymentMethodContainer'
import CouponContainer from '@/ui/component/order/CouponContainer'

const Wrapper = styled.div`
  margin: 50px;
`

const Title = styled.div`
  font-family: sans-serif;
  font-size: 3.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`

const LeftSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const RightSection = styled.div`
  flex: 1;
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 10px;
  position: sticky;
  top: 100px;
  height: fit-content;
  background-color: #fafafa;

  @media (max-width: 768px) {
    position: static;
    margin-top: 1rem;
  }
`

export default function OrderPage() {
  return (
    <>
      <Wrapper>
        <Title>Checkout</Title>

        <Container>
          <LeftSection>
            <CollapsibleBox title={'Shipping Address'}>
              <ShippingAddressContainer />
            </CollapsibleBox>
            <CollapsibleBox title={'Payment Method'}>
              <PaymentMethodContainer />
            </CollapsibleBox>
            <CollapsibleBox title={'Coupons'}>
              <CouponContainer />
            </CollapsibleBox>
          </LeftSection>

          <RightSection>
            <TotalAmountContainer />
          </RightSection>
        </Container>
      </Wrapper>
    </>
  )
}
