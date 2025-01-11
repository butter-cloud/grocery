'use client'

import api from '@/config/axiosInstance'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import ProductDetailImage from '@/ui/component/ProductDetailImage'
import ProductDetailText from '@/ui/component/ProductDetailText'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row; /* Default: desktop layout (image left, text right) */
  gap: 20px;
  width: 100%; /* Full width */

  /* For desktop (1:1 ratio) */
  @media (min-width: 1201px) {
    & > * {
      flex: 1; /* Each child (image and text) will take 50% width */
    }
  }

  /* Mobile layout (stack image and text vertically) */
  @media (max-width: 1200px) {
    flex-direction: column; /* Stack image on top of text */
    & > * {
      flex: none; /* Remove flex behavior on mobile */
      width: 100%; /* Full width for both image and text */
    }
  }
`

export default function ProductDetail() {
  const [data, setData] = useState<TypeProduct>({} as TypeProduct)
  const params = useParams<{ id: string }>()

  useEffect(() => {
    api
      .get(`product/${params.id}`)
      .then((res) => {
        console.log(res.data)
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <Wrapper>
        <ProductDetailImage imgSrc={data.imageUrl} />
        <ProductDetailText product={data} />
      </Wrapper>
    </>
  )
}
