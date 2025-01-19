import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from '@tanstack/react-router'
import type { FunctionComponent } from './common/types'
import { AuthContextProps, useAuth } from 'context/AuthContext'
import { routeTree } from './routeTree.gen'
// import { TanStackRouterDevelopmentTools } from "./components/utils/development-tools/TanStackRouterDevelopmentTools";

export const router = createRouter({
  routeTree,
  context: {
    authentication: {} as AuthContextProps
  }
})
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()

const App = (): FunctionComponent => {
  const auth = useAuth()

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ authentication: auth }} />
    </QueryClientProvider>
  )
}

export default App
