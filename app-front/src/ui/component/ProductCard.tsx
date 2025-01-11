import styled from 'styled-components'

const Wrapper = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 10px;
  padding: 10px;
`

const ProductImageWrapper = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 120%;
  overflow: hidden;

  &:hover button {
    opacity: 1; /* 버튼을 보이게 설정 */
    transform: translateY(0); /* 버튼의 위치를 제자리로 이동 */
  }
`

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  object-position: center;
  display: block;
`

const AddToCartButton = styled.button`
  position: absolute;
  bottom: 5%;
  right: 5%;
  transform: translate(-50%, 20px); /* 초기에는 아래로 이동 */
  opacity: 0; /* 기본적으로 숨김 */
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
  width: 90%;
  height: 40px;
  font-size: 1.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const AddToCartText = styled.div`
  font-size: 1.1rem;
`

const AddToCartIcon = styled.div`
  font-size: 1.2rem;
`

const ProductName = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`

const ProductPrice = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`

export default function ProductCard({
  product,
}: Readonly<{ product: TypeProduct }>) {
  const { id, name, price } = product
  return (
    <>
      <Wrapper href={`/product/detail/${id}`}>
        <ProductImageWrapper>
          <ProductImage src="/image/coffee.png" alt="Product" />
          <AddToCartButton>
            <AddToCartText>Add to Cart</AddToCartText>
            <AddToCartIcon>+</AddToCartIcon>
          </AddToCartButton>
        </ProductImageWrapper>
        <ProductName>{name}</ProductName>
        <ProductPrice>{price} ￦</ProductPrice>
      </Wrapper>
    </>
  )
}
