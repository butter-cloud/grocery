import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
`

const ProductInfo = styled.div`
  @media (min-width: 480px) {
    display: flex;
    gap: 10px;
  }
`

const ProductDetail = styled.div`
  display: flex;
  gap: 10px;
`

const ProductName = styled.div``

const ProductPrice = styled.div``

export default function CartHeadRow() {
  return (
    <>
      <Wrapper>
        <ProductImage src={'/image/apple.png'} />
        <ProductInfo>
          <ProductDetail>
            <ProductName>apple</ProductName>
            <ProductPrice>2000</ProductPrice>
          </ProductDetail>
          <span>1개</span>
        </ProductInfo>
        <span>X</span>
      </Wrapper>
    </>
  )
}
