import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
`
const ProductImageWrapper = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 120%;
`

const ProductImage = styled.img`
  width: 100%;
  height: 100%; /* 부모의 높이를 채우도록 설정 */
  position: absolute; /* 부모 컨테이너에 맞게 조정 */
  object-fit: cover; /* 이미지를 영역에 맞게 크롭 */
  object-position: center; /* 이미지의 가운데를 기준으로 정렬 */
  display: block; /* inline 요소 문제 방지 */
`

interface ProductCardProps {
  imageUrl?: string
  name: string
  price: string
}

export default function ProductCard({
  product,
}: Readonly<{ product: ProductCardProps }>) {
  const { name, price } = product
  return (
    <>
      <Wrapper>
        <ProductImageWrapper>
          <ProductImage src="/product.png" alt="Product" />
        </ProductImageWrapper>
        <h3>{name}</h3>
        <p>{price}</p>
      </Wrapper>
    </>
  )
}
