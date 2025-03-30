'use client'

import ProductCard from '@/ui/component/productList/ProductCard'
import styled from 'styled-components'
import ProductCardSkeleton from '@/ui/component/productList/ProductCardSkeleton'

const ProductGrid = styled.div`
  display: grid;
  gap: 20px;

  /* 기본 한 줄에 4개 */
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1200px) {
    /* 화면이 1200px 이하일 때 한 줄에 3개 */
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    /* 화면이 768px 이하일 때 한 줄에 2개 */
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    /* 화면이 480px 이하일 때 한 줄에 1개 */
    grid-template-columns: repeat(1, 1fr);
  }
`

export default function ProductListPage({ data, isLoading }) {
  console.log('data:', data)
  const productList = data || []

  return (
    <>
      <ProductGrid>
        {isLoading ? (
          Array(8)
            .fill(0)
            .map((_, index) => <ProductCardSkeleton key={index} />)
        ) : productList.length > 0 ? (
          productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <>상품이 없습니다.</>
        )}
      </ProductGrid>
    </>
  )
}
