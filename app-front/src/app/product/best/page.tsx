'use client'

import ProductListPage from '@/ui/pages/ProductListPage'
import { useEffect, useState } from 'react'
import MenuTitle from '@/ui/component/common/MenuTitle'
import productApi from '@/api/product/productApi'

export default function ProductBest() {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    productApi
      .getAllProducts()
      .then((response) => {
        setData(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <MenuTitle title={'BestSellers'} />
      <ProductListPage data={data ?? {}} isLoading={isLoading} />
    </>
  )
}
