import { testHandlers } from '@/msw/handlers/testHandlers'
import { authHandlers } from '@/msw/handlers/authHandlers'
import { productHandlers } from '@/msw/handlers/productHandlers'

export const handlers = [...authHandlers, ...productHandlers, ...testHandlers]
