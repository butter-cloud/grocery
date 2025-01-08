import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
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
        <ProductImage src={'/product.png'} alt={name} />
        <h3>{name}</h3>
        <p>{price}</p>
      </Wrapper>
    </>
  )
}
