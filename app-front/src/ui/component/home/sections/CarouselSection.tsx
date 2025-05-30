import Carousel from '@/ui/component/common/Carousel'
import ProductCard from '@/ui/component/productList/ProductCard'
import { useMediaQuery } from '@mui/material'
import styled from 'styled-components'
import { TypeProduct } from '@/type/TypeProduct'

const products = [
  {
    id: 1,
    name: 'apple',
    price: 1000,
    imageUrl: '/image/apple.png',
  } as TypeProduct,
  {
    id: 1,
    name: 'apple',
    price: 1100,
    imageUrl: '/image/apple.png',
  } as TypeProduct,
  {
    id: 1,
    name: 'apple',
    price: 1200,
    imageUrl: '/image/apple.png',
  } as TypeProduct,
  {
    id: 1,
    name: 'apple',
    price: 1300,
    imageUrl: '/image/apple.png',
  } as TypeProduct,
  {
    id: 1,
    name: 'apple',
    price: 1400,
    imageUrl: '/image/apple.png',
  } as TypeProduct,
  {
    id: 1,
    name: 'apple',
    price: 1500,
    imageUrl: '/image/apple.png',
  } as TypeProduct,
  {
    id: 1,
    name: 'apple',
    price: 1600,
    imageUrl: '/image/apple.png',
  } as TypeProduct,
  {
    id: 1,
    name: 'apple',
    price: 1700,
    imageUrl: '/image/apple.png',
  } as TypeProduct,
  {
    id: 1,
    name: 'apple',
    price: 1800,
    imageUrl: '/image/apple.png',
  } as TypeProduct,
  {
    id: 1,
    name: 'apple',
    price: 1900,
    imageUrl: '/image/apple.png',
  } as TypeProduct,
]

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 250px 0;
`
const Title = styled.div`
  font-size: 2rem;
  margin: 1rem;
  font-weight: 700;
`

export const CarouselSection = () => {
  const isMobile = useMediaQuery('(max-width:768px)')
  const isTablet = useMediaQuery('(max-width:1024px)')
  const carouselWidth = isMobile ? 250 : isTablet ? 500 : 750

  const items = products.map((product, index) => {
    return <ProductCard key={index} product={product} />
  })

  return (
    <>
      <Wrapper>
        <Carousel items={items} carouselWidth={carouselWidth} itemWidth={250} />
      </Wrapper>
    </>
  )
}

export default CarouselSection
