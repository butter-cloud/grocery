import styled from 'styled-components'
import { useState } from 'react'
import sampleProduct from '../../../public/data/sampleProduct.json'
import PlusIcon from '@/ui/icons/PlusIcon'
import { theme } from '@/styles/theme'
import MinusIcon from '@/ui/icons/MinusIcon'
import { useDispatch } from 'react-redux'
import { openModal } from '@/redux/modalSlice'
import { ModalType } from '@/types/ModalType'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.primary};
  gap: 10px;
`
const ProductName = styled.div`
  font-size: 5rem;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 4rem;
  }
`
const ProductDescription = styled.div`
  font-size: 1.5rem;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`
const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 200;
`
const AddToCartButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: 45px;
  border: none;
  border-radius: 50px;
  color: white;
  font-size: 1.5rem;

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.secondary}; /* Change to secondary color */
    color: ${({ theme }) => theme.colors.primary}; /* Change text color */
    border: 1px solid ${({ theme }) => theme.colors.primary}; /* Add border */
  }
`
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

export default function ProductDetailText(props: { product: TypeProduct }) {
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const addItemToCart = () => {
    console.log('Add item to cart')
    dispatch(
      openModal({
        modalType: ModalType.CART_SUCCESS,
        content: {},
      }),
    )
  }

  return (
    <>
      <Wrapper>
        <ProductName>{props.product.name}</ProductName>
        {/*<ProductDescription>{props.product.description}</ProductDescription>*/}
        <ProductDescription
          dangerouslySetInnerHTML={{
            __html: sampleProduct.description,
          }}
        />
        <ProductPrice>{props.product.price} ￦</ProductPrice>
        <ProductPrice>
          Total Price — {props.product.price * quantity} ￦
        </ProductPrice>

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

        <AddToCartButton onClick={addItemToCart}>Add to cart +</AddToCartButton>
      </Wrapper>
    </>
  )
}
