'use client'

import styled from 'styled-components'
import MenuTitle from '@/ui/component/common/MenuTitle'
import { Button } from '@/ui/component/common/Button'
import ShippingAddress from '@/ui/component/order/ShippingAddress'
import CollapsibleBox from '@/ui/component/common/CollapsibleBox'
import { useState } from 'react'

const Wrapper = styled.div`
  margin: 50px;
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
    margin-top: 2rem;
  }
`

const SectionBox = styled.div`
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: white;
`

export default function OrderPage() {
  return (
    <>
      <Wrapper>
        <MenuTitle title={'Checkout'} />

        <Container>
          <LeftSection>
            <CollapsibleBox title={'Shipping Address'}>
              <ShippingAddress />
            </CollapsibleBox>
            <CollapsibleBox title={'Payment Method'}>
              <ShippingAddress />
            </CollapsibleBox>
            <CollapsibleBox title={'Coupons'}>
              <ShippingAddress />
            </CollapsibleBox>
          </LeftSection>

          <RightSection>
            <h3>💰 Total Amount</h3>
            <div style={{ margin: '1rem 0' }}>
              <p>Product Total: 0</p>
              <p>Discount: -0</p>
              <p>
                <strong>Total Amount: 0</strong>
              </p>
            </div>
            <Button variant={'primary'} width={'100%'}>
              Proceed to Payment
            </Button>
          </RightSection>
        </Container>
      </Wrapper>
    </>
  )
}
