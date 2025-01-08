import axios from 'axios'
import { cookies } from 'next/headers'
import ProductListPage from '@/ui/pages/ProductListPage'

export default async function productListServer() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value.toString()

  const res = await axios.get('http://localhost:8080/product/all', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      WithCredentials: true,
    },
  })

  return (
    <>
      <ProductListPage data={res.data} />
    </>
  )
}
