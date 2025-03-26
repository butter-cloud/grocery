'use client'

import ProductListPage from '@/ui/pages/ProductListPage'
import { useEffect, useState } from 'react'
import MenuTitle from '@/ui/component/common/MenuTitle'
import productApi from '@/api/product/productApi'

export default function ProductAll() {
  const [data, setData] = useState({})

  useEffect(() => {
    productApi
      .getAllProducts()
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <MenuTitle title={'All Products'} />
      <ProductListPage data={data ?? {}} />
    </>
  )
}
