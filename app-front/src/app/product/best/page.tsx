'use client'

import axios from 'axios'
import ProductListPage from '@/ui/pages/ProductListPage'
import { useEffect, useState } from 'react'
import MenuTitle from '@/ui/component/common/MenuTitle'

export default function ProductBest() {
  const [data, setData] = useState({})

  useEffect(() => {
    axios
      .get('http://localhost:8080/product/all')
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <MenuTitle title={'BestSellers'} />
      <ProductListPage data={data ?? {}} />
    </>
  )
}
