import styled from 'styled-components'
import ProductCard from '@/ui/component/productList/ProductCard'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  padding: 50px;
  margin-top: 30px;
`
const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-left: 50px;
`
const Title = styled.div`
  font-weight: 500;
  font-style: italic;
`

const ItemWrapper = styled.div`
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

const ProductCardWrapper = styled.div`
  width: 20vw;
  min-width: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
`

export const TrendingSection = () => {
  const products = [
    { id: 1, name: 'apple', price: 1200 },
    { id: 2, name: 'apple', price: 1200 },
    { id: 3, name: 'apple', price: 1200 },
  ]
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>Today's trends</Title>
      </TitleWrapper>
      <ItemWrapper>
        {products.map((product, index) => {
          return (
            <ProductCardWrapper key={index}>
              <ProductCard product={product} />
            </ProductCardWrapper>
          )
        })}
      </ItemWrapper>
    </Wrapper>
  )
}

export default TrendingSection
