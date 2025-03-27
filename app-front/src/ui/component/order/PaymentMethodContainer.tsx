'use client'

import styled from 'styled-components'
import { useState } from 'react'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const PaymentDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.5rem;
  background-color: #f8f8f8;
`

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const RadioInput = styled.input`
  /* 숨겨진 기본 radio 버튼 */
  display: none;

  &:checked + span {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:checked + span::after {
    transform: translate(-50%, -50%) scale(1); // 점 중앙 정렬 + 보이게
  }
`

const RadioButton = styled.span`
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.colors.gray};
  border-radius: 50%;
  margin-right: 10px;
  background-color: transparent;
  transition: border-color 0.3s;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.2s ease;
  }
`;
const Text = styled.div`
  font-style: italic;
`
export default function PaymentMethodContainer() {
  const [selectedMethod, setSelectedMethod] = useState('credit_card')

  return (
    <Container>
      <RadioGroup>
        <Label>
          <RadioInput
            type="radio"
            name="payment"
            value="credit_card"
            checked={selectedMethod === 'credit_card'}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <RadioButton />
          Credit / Debit Card
        </Label>
        <Label>
          <RadioInput
            type="radio"
            name="payment"
            value="paypal"
            checked={selectedMethod === 'paypal'}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <RadioButton />
          PayPal
        </Label>
        <Label>
          <RadioInput
            type="radio"
            name="payment"
            value="apple_pay"
            checked={selectedMethod === 'apple_pay'}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <RadioButton />
          Apple Pay
        </Label>
      </RadioGroup>

      {selectedMethod === 'credit_card' && (
        <PaymentDetails>
          <Input type="text" placeholder="Card Number" />
          <Input type="text" placeholder="Name on Card" />
          <Input type="text" placeholder="Expiry Date (MM/YY)" />
          <Input type="text" placeholder="CVV" />
        </PaymentDetails>
      )}

      {selectedMethod === 'paypal' && (
        <PaymentDetails>
          <Input type="email" placeholder="PayPal Email" />
        </PaymentDetails>
      )}

      {selectedMethod === 'apple_pay' && (
        <PaymentDetails>
          <Text>Apple Pay will be processed using your connected device.</Text>
        </PaymentDetails>
      )}
    </Container>
  )
}
