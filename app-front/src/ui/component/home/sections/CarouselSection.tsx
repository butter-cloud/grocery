import Carousel from '@/ui/component/common/Carousel'
import ProductCard from '@/ui/component/productList/ProductCard'

export const CarouselSection = () => {
  const products = [
    { id: 1, name: 'apple', price: 1000 } as TypeProduct,
    { id: 1, name: 'apple', price: 1100 } as TypeProduct,
    { id: 1, name: 'apple', price: 1200 } as TypeProduct,
    { id: 1, name: 'apple', price: 1300 } as TypeProduct,
    { id: 1, name: 'apple', price: 1400 } as TypeProduct,
    { id: 1, name: 'apple', price: 1500 } as TypeProduct,
    { id: 1, name: 'apple', price: 1600 } as TypeProduct,
    { id: 1, name: 'apple', price: 1700 } as TypeProduct,
    { id: 1, name: 'apple', price: 1800 } as TypeProduct,
    { id: 1, name: 'apple', price: 1900 } as TypeProduct,
  ]

  const items = products.map((product, index) => {
    return <ProductCard key={index} product={product} />
  })

  return (
    <>
      <Carousel items={items} carouselWidth={600} itemWidth={200} />
    </>
  )
}

export default CarouselSection
