export const PAGE_URLS = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  CART: '/cart',
  LOADING: '/loading',
  PRODUCT_ALL: '/product/all',
  PRODUCT_BEST: '/product/best',
  PRODUCT_DETAIL: (id: string | number) => `/product/detail/${id}`,
  ADMIN_NEW: '/admin/new',
}
