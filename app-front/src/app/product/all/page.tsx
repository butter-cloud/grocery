'use client'

import axios from 'axios'
import ProductListPage from '@/ui/pages/ProductListPage'
import { useEffect, useState } from 'react'
import MenuTitle from '@/ui/component/common/MenuTitle'
import api from "@/config/axiosInstance";

export default function ProductAll() {
  const [data, setData] = useState({})

  useEffect(() => {
    api
      .get('/product/all')
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
