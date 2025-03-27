'use client'

import styled from 'styled-components'
import { useState } from 'react'
import { Button } from '@/ui/component/common/Button'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const InputRow = styled.div`
  display: flex;
  gap: 1.5rem;

  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 6px;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`

const Message = styled.div`
  color: green;
  font-size: 0.9rem;
`

export default function CouponContainer() {
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)

  const [points, setPoints] = useState('')
  const [pointsApplied, setPointsApplied] = useState(false)

  const applyCoupon = () => {
    // demo code
    if (couponCode.trim()) {
      setCouponApplied(true)
    }
  }

  const applyPoints = () => {
    if (points.trim() && !isNaN(Number(points))) {
      setPointsApplied(true)
    }
  }

  return (
    <Container>
      <FieldGroup>
        <label>Coupon Code</label>
        <InputRow>
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter your coupon code"
          />
          <Button variant="primary" onClick={applyCoupon}>
            Apply
          </Button>
        </InputRow>
        {couponApplied && <Message>Coupon applied!</Message>}
      </FieldGroup>

      <FieldGroup>
        <label>Use Points</label>
        <InputRow>
          <input
            type="text"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            placeholder="Enter points to use"
          />
          <Button variant="primary" onClick={applyPoints}>
            Apply
          </Button>
        </InputRow>
        {pointsApplied && <Message>Points applied!</Message>}
      </FieldGroup>
    </Container>
  )
}
