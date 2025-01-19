import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from '@tanstack/react-router'
import type { FunctionComponent } from './common/types'
import { AuthContextProps, useAuth } from 'context/AuthContext'
import { routeTree } from 'routeTree.gen'
// import { TanStackRouterDevelopmentTools } from "./components/utils/development-tools/TanStackRouterDevelopmentTools";

const router = createRouter({
  routeTree,
  context: {
    // Define the default context here if needed
    authentication: {} as AuthContextProps // Use a placeholder or proper default value
  }
})
declare module '@tanstack/react-router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
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
