import { testHandlers } from '@/mocks/handlers/testHandlers'
import { authHandlers } from '@/mocks/handlers/authHandlers'

export const handlers = [...authHandlers, ...testHandlers]
