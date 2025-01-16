import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, type createRouter } from '@tanstack/react-router'
import type { FunctionComponent } from './common/types'
import { AuthProvider, useAuth } from 'context/AuthContext'
// import { TanStackRouterDevelopmentTools } from "./components/utils/development-tools/TanStackRouterDevelopmentTools";

const queryClient = new QueryClient()

type AppProps = { router: ReturnType<typeof createRouter> }

const App = ({ router }: AppProps): FunctionComponent => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WithAuthContext router={router} />
      </AuthProvider>
    </QueryClientProvider>
  )
}

const WithAuthContext: React.FC<{
  router: ReturnType<typeof createRouter>
}> = ({ router }) => {
  const auth = useAuth()

  return <RouterProvider router={router} context={{ authentication: auth }} />
}

export default App
