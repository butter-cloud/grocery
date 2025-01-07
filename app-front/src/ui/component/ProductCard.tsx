import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
`

export default function ProductCard() {
  return (
    <>
      <Wrapper>
        <ProductImage src="https://via.placeholder.com/150" alt="product" />
        <h3>Product Name</h3>
        <p>$100</p>
      </Wrapper>
    </>
  )
}
