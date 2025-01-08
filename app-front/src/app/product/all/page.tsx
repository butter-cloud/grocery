import axios from 'axios'
import { cookies, headers } from 'next/headers'
import ProductListPage from '@/ui/pages/ProductListPage'
import { redirect } from 'next/navigation'

export default async function productListServer() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value.toString()

  const headerList = await headers()
  const referer = headerList.get('x-current-path')
  console.log('referer:', referer)

  const res = await axios
    .get('http://localhost:8080/product/all', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        WithCredentials: true,
      },
    })
    .then((res) => {
      if (res.status === 401 || res.status === 403) {
        console.log('401 403 error')
        throw redirect(
          `/auth/login?redirect=${encodeURIComponent(referer ?? '/')}`,
        )
      }
      return res
    })
    .catch((err) => {
      console.error(err)
      if (err.status === 401 || err.status === 403) {
        console.log('401 403 error')
        throw redirect(
          `/auth/login?redirect=${encodeURIComponent(referer ?? '/')}`,
        )
      }
    })

  return (
    <>
      <ProductListPage data={res?.data ?? {}} />
    </>
  )
}
