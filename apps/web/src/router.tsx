import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import type { iSuccessLogin } from '@/types/api'

type User = iSuccessLogin['user']

export type RouterContext = {
  auth: {
    user: User | null
    isAuthenticated: boolean
  }
}

const router = createRouter({
  routeTree,
  context: {} as RouterContext,
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

export default router;