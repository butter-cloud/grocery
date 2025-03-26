export const PAGE_URLS = {
  HOME: '/',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  CART: '/cart',
  LOADING: '/loading',
  PRODUCT: {
    ALL: '/product/all',
    BEST: '/product/best',
    DETAIL: (id: string | number) => `/product/detail/${id}`,
  },
  ADMIN: {
    NEW: '/admin/new',
  },
}
