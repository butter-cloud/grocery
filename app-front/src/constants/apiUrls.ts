export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export const API_URLS = {
  HELLO: '/api/hello',
  TEST: '/api/test',

  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',

  PRODUCT_ALL: '/product/all',
  PRODUCT_NEW: '/product/new',
  PRODUCT_DETAIL: '/product/detail',

  CART_ITEMS: '/cart/items',
  CART_INCREASE: '/cart/increase',
  CART_DECREASE: '/cart/decrease',
  CART_DELETE: '/cart/delete',
  CART_MERGE: '/cart/merge',
}
