import styled from 'styled-components'
import MinusIcon from '@/ui/icons/MinusIcon'
import { theme } from '@/util/style/theme'
import PlusIcon from '@/ui/icons/PlusIcon'

const QuantityWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50px;
  width: 140px;
  height: 45px;
`

const QuantityButton = styled.button`
  border: none;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  background-color: transparent;
  padding-bottom: 7px;
`

const QuantityDisplay = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`

interface QuantityContainerProps {
  quantity: number
  increaseQuantity: () => void
  decreaseQuantity: () => void
}

export default function QuantityContainer(props: QuantityContainerProps) {
  const { quantity, increaseQuantity, decreaseQuantity } = props
  return (
    <QuantityWrapper>
      <QuantitySelector>
        <QuantityButton onClick={decreaseQuantity}>
          <MinusIcon color={theme.colors.primary} />
        </QuantityButton>
        <QuantityDisplay>{quantity}</QuantityDisplay>
        <QuantityButton onClick={increaseQuantity}>
          <PlusIcon color={theme.colors.primary} />
        </QuantityButton>
      </QuantitySelector>
    </QuantityWrapper>
  )
}
