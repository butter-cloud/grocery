import { http, HttpResponse } from 'msw'
import { API_BASE_URL } from '@/constants/apiUrls'
import { TypeProduct } from '@/type/TypeProduct'

// TODO: fix imageUrl
export const MOCK_PRODUCTS: TypeProduct[] = [
  {
    id: 1,
    name: 'apple',
    price: 1000,
    imageUrl: '/image/apple.png',
  },
  {
    id: 2,
    name: 'pico',
    price: 1800,
    imageUrl: '/image/coffee.png',
  },
  {
    id: 3,
    name: 'pear',
    price: 1300,
    imageUrl: '/image/pear.png',
  },
  {
    id: 5,
    name: 'cup',
    price: 3000,
    imageUrl: '/image/apple.png',
  },
  {
    id: 6,
    name: 'banana',
    price: 1200,
    imageUrl: '/image/apple.png',
  },
]

export const productHandlers = [
  http.get(`${API_BASE_URL}/product/all`, () => {
    console.log('[msw] get all products handler')
    return HttpResponse.json(MOCK_PRODUCTS, { status: 200 })
  }),

  http.get(`${API_BASE_URL}/product/detail`, ({ request }) => {
    console.log('[msw] get product detail handler')
    const url = new URL(request.url)
    const id = Number(url.searchParams.get('id'))

    const product = MOCK_PRODUCTS.find((p) => p.id === id)

    if (product) {
      return HttpResponse.json(product, { status: 200 })
    } else {
      return HttpResponse.json({ error: 'Product not found' }, { status: 404 })
    }
  }),
]
