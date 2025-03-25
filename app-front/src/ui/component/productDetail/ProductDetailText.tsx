import styled from 'styled-components'
import sampleProduct from '../../../../public/data/sampleProduct.json'
import QuantityContainer from '@/ui/component/productDetail/QuantityContainer'
import useProductDetailPageProps from '@/hook/useProductDetailPageProps'
import useCartProps from '@/hook/useCartProps'

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
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.secondary}; /* Change to secondary color */
    color: ${({ theme }) => theme.colors.primary}; /* Change text color */
    border: 1px solid ${({ theme }) => theme.colors.primary}; /* Add border */
  }
`

export default function ProductDetailText(props: { product: TypeProduct }) {
  const { quantity, increaseQuantity, decreaseQuantity } =
    useProductDetailPageProps()
  const { increaseCartQuantity } = useCartProps()

  const addItemToCart = (quantity: number) => {
    increaseCartQuantity(props.product.id, quantity, true)
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
        <QuantityContainer
          quantity={quantity}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
        <AddToCartButton
          onClick={() => {
            addItemToCart(quantity)
          }}
        >
          Add to cart +
        </AddToCartButton>
      </Wrapper>
    </>
  )
}
