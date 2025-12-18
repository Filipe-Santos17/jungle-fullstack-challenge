import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { Toaster } from "@/components/ui/sonner"
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

const queryClient = new QueryClient()

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'
import router from "./router.tsx"
import { useAuthStore } from '@/stores/auth.store.ts'

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function AppRouter() {
  const { user, isAuthenticated } = useAuthStore()

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        context={{
          auth: {
            user,
            isAuthenticated,
          },
        }}
      />
    </QueryClientProvider>
  )
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <AppRouter />
      <Toaster position='top-center' />
    </StrictMode>,
  )
}

reportWebVitals()